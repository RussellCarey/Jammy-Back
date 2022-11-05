// item.entity.ts
import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../users/users.entity';
import { Project } from '../projects/projects.entity';

@Entity({ name: 'favourited_projects' })
export class FavouritedProjects extends BaseEntity {
  @Column()
  userId!: number;

  @Column()
  projectId!: number;

  @ManyToOne(() => User, (user) => user.favourite_projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, (project) => project.favourited_by)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
