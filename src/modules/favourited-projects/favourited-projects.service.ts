import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouritedProjects } from './favourited-projects.entity';
import { Repository } from 'typeorm';
import { FavouritedProjectDTO } from './favourited-projects.dto';

@Injectable()
export class FavouritedProjectServices {
  constructor(
    @InjectRepository(FavouritedProjects)
    private fpRepoitory: Repository<FavouritedProjects>,
  ) {}

  async getOne(params: {
    userid?: number;
    projectid?: number;
  }): Promise<FavouritedProjects> {
    const favouritedProject = await this.fpRepoitory.findOne({
      // Array is like OR.
      where: [{ userId: params.userid }, { projectId: params.projectid }],
    });
    return favouritedProject;
  }

  async getAll(params: {
    order?: any;
    skip?: number;
    take?: number;
  }): Promise<FavouritedProjects[]> {
    const { skip, take, order } = params;
    const relations = await this.fpRepoitory.find({
      skip,
      take,
      order,
    });

    return relations;
  }

  async create(data: FavouritedProjectDTO): Promise<FavouritedProjects> {
    const favouritedProject = await this.fpRepoitory.save(data);
    return favouritedProject;
  }

  async delete(id: number): Promise<FavouritedProjects | undefined> {
    const deletedFavouritedProject = await this.fpRepoitory.delete(id);
    return deletedFavouritedProject.raw[0];
  }
}
