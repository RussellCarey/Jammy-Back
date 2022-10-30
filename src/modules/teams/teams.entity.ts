// item.entity.ts
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.teams)
  user: User[];

  @ManyToOne(() => Jam, (jam) => jam.teams)
  jam: Jam[];

  @OneToOne(() => Project, (project) => project.team)
  @JoinColumn()
  project: Project;
}
