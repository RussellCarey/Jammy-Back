import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './favourite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavouriteServices {
  constructor(
    @InjectRepository(Favourite)
    private favouriteRepository: Repository<Favourite>,
  ) {}

  // Get one by project id and user id
  async getOneProjectFavourite(params: {
    userid?: number;
    projectid?: number;
  }): Promise<Favourite> {
    const favouritedProject = await this.favouriteRepository.findOne({
      where: { user_id: params.userid, project_id: params.projectid },
    });
    return favouritedProject;
  }

  // Get one by comment id and user id
  async getOneCommentFavourite(params: {
    userid?: number;
    commentid?: number;
  }): Promise<Favourite> {
    const favouritedProject = await this.favouriteRepository.findOne({
      where: { user_id: params.userid, comment_id: params.commentid },
    });
    return favouritedProject;
  }

  // GEt all regardless of type
  async getAll(params: {
    order?: any;
    skip?: number;
    take?: number;
  }): Promise<Favourite[]> {
    const { skip, take, order } = params;
    const relations = await this.favouriteRepository.find({
      skip,
      take,
      order,
    });

    return relations;
  }

  async getAllResource(
    resource,
    params: {
      order?: any;
      skip?: number;
      take?: number;
      sesssion?: any;
    },
  ): Promise<Favourite[]> {
    const { skip, take, order } = params;

    const favourited = await this.favouriteRepository
      .createQueryBuilder('favourite')
      .where(`favourite.${resource}_id != NULL`)
      .skip(skip)
      .take(take)
      .orderBy(order)
      .getMany();

    return favourited;
  }

  // Get all of one resource of users; eg: one project favourites
  async getAllResourceFromUser(
    resource,
    session,
    params: {
      order?: any;
      skip?: number;
      take?: number;
    },
  ): Promise<Favourite[]> {
    const { skip, take, order } = params;

    const favourited = await this.favouriteRepository
      .createQueryBuilder('favourite')
      .where(
        `favourite.${resource}_id != NULL AND favourite.user_id = ${session.user.id}`,
      )
      .skip(skip)
      .take(take)
      .orderBy(order)
      .getMany();

    return favourited;
  }

  async createProjectFavourite(id, session): Promise<Favourite> {
    const favouritedProject = await this.favouriteRepository.save({
      user_id: session.user.id,
      project_id: id,
      comment_id: null,
    });
    return favouritedProject;
  }

  async createCommentFavourite(id, session): Promise<Favourite> {
    const favouritedProject = await this.favouriteRepository.save({
      user_id: session.user.id,
      comment_id: id,
      project_id: null,
    });
    return favouritedProject;
  }

  // Get favourite count of one resource eg: all for one project.
  async getResourceFavouriteCount(
    resource: string,
    id: number,
  ): Promise<number> {
    const resourceCount = await this.favouriteRepository
      .createQueryBuilder('favourite')
      .where(`favourite.${resource}_id = ${id}`)
      .getCount();
    return resourceCount;
  }

  // Delete a favourite
  async delete(id: number): Promise<Favourite | undefined> {
    const deletedFavouritedProject = await this.favouriteRepository.delete(id);
    return deletedFavouritedProject.raw[0];
  }
}
