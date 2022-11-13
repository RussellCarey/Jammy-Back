import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async getOneComment(session: any, commentid: number): Promise<Comment> {
    const favouritedProject = await this.commentRepository.findOne({
      // Array is like OR.
      where: { user_id: session.user.id, id: commentid },
    });
    return favouritedProject;
  }

  async getOneProjectComment(
    session: any,
    projectid: number,
  ): Promise<Comment> {
    const favouritedProject = await this.commentRepository.findOne({
      // Array is like OR.
      where: { user_id: session.user.id, project_id: projectid },
    });
    return favouritedProject;
  }

  // async getOneCommentLike(params: {
  //   userid?: number;
  //   commentid?: number;
  // }): Promise<Favourite> {
  //   const favouritedComment = await this.commentRepository.findOne({
  //     // Array is like OR.
  //     where: [{ user_id: params.userid }, { comment_id: params.commentid }],
  //   });
  //   return favouritedComment;
  // }

  async getAll(params: {
    order?: any;
    skip?: number;
    take?: number;
  }): Promise<Comment[]> {
    const { skip, take, order } = params;
    const relations = await this.commentRepository.find({
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
    },
  ): Promise<Comment[]> {
    const { skip, take, order } = params;
    const comments = await this.commentRepository
      .createQueryBuilder()
      .select('*')
      .from(Comment, 'comment')
      .where(`comment.${resource}_id IS NOT NULL`)
      .skip(skip)
      .take(take)
      .orderBy(order)
      .execute();

    return comments;
  }

  async getAllResourceFromUser(
    resource,
    params: {
      order?: any;
      skip?: number;
      take?: number;
    },
    session: any,
  ): Promise<Comment[]> {
    const { skip, take, order } = params;
    const comments = await this.commentRepository
      .createQueryBuilder()
      .select('*')
      .from(Comment, 'comment')
      .where(
        `comment.${resource}_id IS NOT NULL AND user_id = ${session.user.id}`,
      )
      .skip(skip)
      .take(take)
      .orderBy(order)
      .execute();

    return comments;
  }

  async getResourceCommentCount(resource: string, id: number): Promise<number> {
    const resourceCount = await this.commentRepository
      .createQueryBuilder('comment')
      .where(`comment.${resource}_id = ${id}`)
      .getCount();
    return resourceCount;
  }

  async createProjectComment(
    id: number,
    session,
    comment: string,
  ): Promise<Comment> {
    const favouritedProject = await this.commentRepository.save({
      user_id: session.user.id,
      project_id: id,
      comment: comment,
    });
    return favouritedProject;
  }

  async createJamComment(
    id: number,
    session,
    comment: string,
  ): Promise<Comment> {
    const favouritedProject = await this.commentRepository.save({
      user_id: session.user.id,
      jam_id: id,
      comment: comment,
    });
    return favouritedProject;
  }

  async addRemoveFavouriteCount(id: number, value: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: id },
    });
    comment.favourites += value;
    const updatedComment = await this.commentRepository.save(comment);
    return updatedComment;
  }

  async delete(id: number): Promise<Comment | undefined> {
    const deletedFavouritedProject = await this.commentRepository.delete(id);
    return deletedFavouritedProject.raw[0];
  }
}
