import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouritedProjects } from './favourited-projects.entity';
import { Repository } from 'typeorm';
import { FavouritedProjectDTO } from './favourited-projects.dto';
import { Session } from 'inspector';
import { session } from 'passport';

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
      where: [{ user_id: params.userid }, { project_id: params.projectid }],
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

  async getAllFromUser(
    params: {
      order?: any;
      skip?: number;
      take?: number;
    },
    session: any,
  ): Promise<FavouritedProjects[]> {
    const { skip, take, order } = params;
    const relations = await this.fpRepoitory.find({
      skip,
      take,
      order,
      where: { user_id: session.user.id },
    });

    return relations;
  }

  async create(id, session): Promise<FavouritedProjects> {
    const favouritedProject = await this.fpRepoitory.save({
      user_id: session.user.id,
      project_id: id,
    });
    return favouritedProject;
  }

  async delete(id: number): Promise<FavouritedProjects | undefined> {
    const deletedFavouritedProject = await this.fpRepoitory.delete(id);
    return deletedFavouritedProject.raw[0];
  }
}
