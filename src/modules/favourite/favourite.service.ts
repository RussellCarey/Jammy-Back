import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './favourite.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { Comment } from '../comments/comments.entity';
import startTransaction from 'src/utils/queryTransactionCreator';

@Injectable()
export class FavouriteServices {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Favourite)
    private favouriteRepository: Repository<Favourite>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
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

  async createProjectFavourite(id: number, session: any): Promise<Favourite> {
    const queryRunner = await startTransaction(this.dataSource);

    // Create the favourite for the project
    const favouritedProject = await this.favouriteRepository.create({
      user_id: session.user.id,
      project_id: id,
      comment_id: null,
    });

    try {
      // Update the project favourite count
      const project = await this.projectRepository.findOne({
        where: { id: id },
      });

      project.favourites += 1;

      // Update and resolve transactions.
      await queryRunner.manager.save(favouritedProject);
      await queryRunner.manager.save(project);
      await queryRunner.commitTransaction();

      return favouritedProject;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async createCommentFavourite(id, session): Promise<Favourite> {
    const queryRunner = await startTransaction(this.dataSource);

    // Create the favourite for the project
    const favouritedComment = await this.favouriteRepository.create({
      user_id: session.user.id,
      project_id: null,
      comment_id: id,
    });

    try {
      // Update the project favourite count
      const comment = await this.commentRepository.findOne({
        where: { id: id },
      });
      comment.favourites += 1;

      // Update and resolve transactions.
      await queryRunner.manager.save(favouritedComment);
      await queryRunner.manager.save(comment);
      await queryRunner.commitTransaction();

      return favouritedComment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
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
  async delete(id: number, session: any): Promise<Favourite | undefined> {
    const queryRunner = await startTransaction(this.dataSource);

    try {
      // Get comment we wish to delete
      const favouriteToDelete = await this.favouriteRepository.findOne({
        where: { id: id },
      });

      // If we cannot find the item to delete
      if (!favouriteToDelete)
        throw new NotFoundException('Cannot find comment with provided id');

      // If this is not owned by the user session
      if (favouriteToDelete.user_id !== session.user.id)
        throw new UnauthorizedException('You do not own this resource');

      // Check which to delete, comment or project like (mins 1 from their count)

      if (favouriteToDelete.project_id !== null) {
        const projectToUpdate = await this.projectRepository.findOne({
          where: { id: favouriteToDelete.project_id },
        });
        projectToUpdate.favourites -= 1;
        await queryRunner.manager.save(projectToUpdate);
      }

      if (favouriteToDelete.comment_id !== null) {
        const commentToUpdate = await this.projectRepository.findOne({
          where: { id: favouriteToDelete.comment_id },
        });
        commentToUpdate.favourites -= 1;
        await queryRunner.manager.save(commentToUpdate);
      }

      // Delete the favourite
      await queryRunner.manager.remove(favouriteToDelete);
      await queryRunner.commitTransaction();

      return favouriteToDelete;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
