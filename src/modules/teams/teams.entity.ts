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

  @Column({ nullable: true })
  jam_id: number;

  @Column({ nullable: true })
  project_id: number;

  // Relations
  @ManyToOne(() => Jam, (jam) => jam.teams)
  @JoinColumn()
  jam: Jam;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];

  @OneToOne(() => Project, (project) => project.team)
  @JoinColumn()
  project: Project;
}
