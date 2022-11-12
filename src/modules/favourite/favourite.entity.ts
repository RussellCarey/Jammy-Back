// item.entity.ts
import { Entity, Column, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Project } from '../projects/projects.entity';
import { User } from '../users/users.entity';
import { Comment } from '../comments/comments.entity';

@Entity({ name: 'favourite' })
export class Favourite extends BaseEntity {
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  project_id: number;

  @Column({ nullable: true })
  comment_id: number;

  @ManyToOne(() => User, (user) => user.favourites)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project, (project) => project.favourited_by)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Comment, (comment) => comment.favourited_by)
  @JoinColumn()
  comment: Comment;
}
