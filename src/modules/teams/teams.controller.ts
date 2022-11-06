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
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { TeamServices } from './teams.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { Team } from './teams.entity';
import { TeamDTO } from './teams.dto';
import { TeamUpdateDTO } from './teams.update.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamServices: TeamServices) {}

  @Get('search')
  async searchForTeamByName(
    @Query('name') name?: string,
  ): Promise<IResponse<Team>> {
    const team = await this.teamServices.getTeamByName(name);
    return { message: 'Retrieved team', data: team };
  }

  @Get(':teamId')
  async get(
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<IResponse<Team>> {
    const project = await this.teamServices.getTeamById(teamId);
    return { message: 'Retrieved team', data: project };
  }

  @Get()
  async getAll(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<IResponse<Team[]>> {
    const teams = await this.teamServices.getAllTeams({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved teams', data: teams };
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async create(@Body() body: TeamDTO): Promise<IResponse<Team>> {
    const createdTeam = await this.teamServices.create(body);
    return {
      message: `Created a new team`,
      data: createdTeam,
    };
  }

  @UseGuards(LoggedInGuard)
  @Patch(':teamId')
  async update(
    @Body() body: TeamUpdateDTO,
    @Param('teamId', ParseIntPipe) teamId: number,
  ): Promise<IResponse<Team>> {
    const updatedTeam = await this.teamServices.update(teamId, body);
    return { message: `Updated a team`, data: updatedTeam };
  }

  @UseGuards(LoggedInGuard)
  @Delete(':teamId')
  async deleteUser(@Param('teamId', ParseIntPipe) teamId: number) {
    const deletedJam = await this.teamServices.delete(teamId);
    return {
      data: deletedJam,
      message: 'Deleted a jam',
    };
  }
}
