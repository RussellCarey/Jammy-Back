// item.entity.ts
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Project } from '../projects/projects.entity';
import { User } from '../users/users.entity';
import { Favourite } from '../favourite/favourite.entity';
import { Jam } from '../jams/jams.entity';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @Index(['project_id', 'user_id', 'commented_user'], { unique: true })
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  project_id: number;

  @Column({ nullable: true })
  jam_id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project, (project) => project.comments)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Jam, (jam) => jam.comments)
  @JoinColumn()
  jam: Jam;

  @OneToMany(() => Favourite, (favourite) => favourite.comment)
  favourited_by: Favourite[];
}
