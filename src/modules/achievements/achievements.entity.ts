// item.entity.ts
import {
  Entity,
  Column,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../users/users.entity';
import { Project } from '../projects/projects.entity';

@Entity({ name: 'achievements' })
export class Achievement extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  image: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @OneToOne(() => Project, (project) => project.team)
  @JoinColumn()
  project: Project;
}
