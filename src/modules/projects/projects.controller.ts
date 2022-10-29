import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { ProjectServices } from './projects.service';
import { ProjectDTO } from './projects.dto';
import { ProjectUpdateDTO } from './projects.update.dto';

@Controller('projects')
export class ProjetController {
  constructor(private readonly projectServices: ProjectServices) {}

  @Get('search')
  async searchForProjectByName(@Query('name') name?: string): Promise<any> {
    const project = await this.projectServices.getProjectByName(name);
    return { message: 'Retrieved projects', data: project };
  }

  @Get(':projectId')
  async getProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<any> {
    const project = await this.projectServices.getProjectById(projectId);
    return { message: 'Retrieved projects', data: project };
  }

  @Get()
  async getAllProjects(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const projects = await this.projectServices.getAllProjetss({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved projects', data: projects };
  }

  @Post()
  async createProject(@Body() body: ProjectDTO) {
    const createdProject = await this.projectServices.createProject(body);
    return {
      message: `Created a new project`,
      data: createdProject,
    };
  }

  @Patch(':projectId')
  async updateProjet(
    @Body() body: ProjectUpdateDTO,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    const updatedProject = await this.projectServices.updateProject(
      projectId,
      body,
    );
    return { message: `Updated a project`, data: updatedProject, status: true };
  }
}
