import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ProjectDTO } from './projects.dto';
import { Project } from './projects.entity';
import { ProjectUpdateDTO } from './projects.update.dto';

@Injectable()
export class ProjectServices {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id: id });
    return project;
  }

  async getProjectByName(term: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { project_title: ILike(`%${term}%`) },
    });
    return project;
  }

  async getAllProjects(params: {
    order?: any;
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<Project[]> {
    const { skip, take, order, where } = params;
    const projects = await this.projectRepository.find({
      skip,
      take,
      order,
      where,
    });
    return projects;
  }

  async createProject(projectData: ProjectDTO): Promise<Project> {
    console.log(projectData);
    const project = await this.projectRepository.save(projectData);
    return project;
  }

  async updateProject(
    id: number,
    projectData: ProjectUpdateDTO,
  ): Promise<Project> {
    const result = await this.projectRepository
      .createQueryBuilder()
      .update<Project>(Project, { ...projectData })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async delete(id: number): Promise<Project | undefined> {
    const deletedProjet = await this.projectRepository.delete(id);
    return deletedProjet.raw[0];
  }
}
