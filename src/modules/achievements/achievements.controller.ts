import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { AchievementService } from './achievements.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { Achievement } from './achievements.entity';
import { AchievementDTO } from './achievements.dto';
import { AchievementUpdateDTO } from './achievements.update.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  async getAllAchievements(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<IResponse<Achievement[]>> {
    const achievement = await this.achievementService.getAll({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved achievements', data: achievement };
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() body: AchievementDTO): Promise<IResponse<Achievement>> {
    const createdAchievement = await this.achievementService.create(body);
    return {
      message: `Created a achievement`,
      data: createdAchievement,
    };
  }

  @UseGuards(AdminGuard)
  @Patch(':achievementId')
  async update(
    @Body() body: AchievementUpdateDTO,
    @Param('achievementId', ParseIntPipe) achievementId: number,
  ): Promise<IResponse<Achievement>> {
    const updatedAchievement = await this.achievementService.update(
      achievementId,
      body,
    );
    return { message: `Updated an achievement`, data: updatedAchievement };
  }

  @UseGuards(AdminGuard)
  @Delete(':achievementId')
  async deleteUser(
    @Param('achievementId', ParseIntPipe) achievementId: number,
  ) {
    const deleteAchievement = await this.achievementService.delete(
      achievementId,
    );
    return {
      data: deleteAchievement,
      message: `Deleted an achievement`,
    };
  }
}
