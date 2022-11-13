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
import { ProjectServices } from './projects.service';
import { ProjectDTO } from './projects.dto';
import { Project } from './projects.entity';
import { ProjectUpdateDTO } from './projects.update.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

@Controller('projects')
export class ProjetController {
  constructor(private readonly projectServices: ProjectServices) {}

  @Get('search')
  async searchForProjectByName(
    @Query('name') name?: string,
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<IResponse<Project[]>> {
    const project = await this.projectServices.getProjectByName(name, {
      skip,
      take,
      order,
    });
    return { message: 'Retrieved projects', data: project };
  }

  @Get(':projectId')
  async get(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<IResponse<Project>> {
    const project = await this.projectServices.getProjectById(projectId);
    return { message: 'Retrieved projects', data: project };
  }

  @Get()
  async getAll(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<IResponse<Project[]>> {
    const projects = await this.projectServices.getAllProjects({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved projects', data: projects };
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async create(@Body() body: ProjectDTO): Promise<IResponse<Project>> {
    const createdProject = await this.projectServices.createProject(body);
    return {
      message: `Created a new project`,
      data: createdProject,
    };
  }

  @UseGuards(LoggedInGuard)
  @Patch(':projectId')
  async update(
    @Body() body: ProjectUpdateDTO,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<IResponse<Project>> {
    const updatedProject = await this.projectServices.updateProject(
      projectId,
      body,
    );
    return { message: `Updated a project`, data: updatedProject };
  }

  @UseGuards(LoggedInGuard)
  @Delete(':projectId')
  async deleteUser(@Param('projectId', ParseIntPipe) projectId: number) {
    const deletedProject = await this.projectServices.delete(projectId);
    return {
      data: deletedProject,
      message: 'Deleted a project',
    };
  }
}
