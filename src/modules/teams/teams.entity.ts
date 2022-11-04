// item.entity.ts
import {
  Entity,
  Column,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../users/user.entity';
import { Jam } from '../jams/jams.entity';
import { Project } from '../projects/projects.entity';

@Entity({ name: 'teams' })
export class Team extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  team_name: string;

  @Column({ type: 'varchar', length: 300 })
  team_description: string;

  @Column({ type: 'varchar', length: 300 })
  team_image: string;

  @Column({ type: 'int', nullable: true })
  projectId: number;

  // Relations
  @ManyToMany(() => Jam, (jam) => jam.teams)
  jam: Jam;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @OneToOne(() => Project, (project) => project.team)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
