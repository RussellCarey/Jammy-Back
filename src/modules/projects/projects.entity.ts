// item.entity.ts
import { Entity, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  project_title: string;

  @Column({ type: 'varchar', length: 300 })
  project_description: string;

  @Column({ type: 'varchar', length: 100 })
  youtube_url: string;

  @Column({ type: 'varchar', length: 100 })
  github_url: string;

  @Column({ type: 'varchar', length: 100 })
  live_site_url: string;

  @Column({ type: 'varchar', length: 100 })
  header_image: string;

  @Column({ type: 'varchar', length: 100 })
  background_image: string;

  @Column({ type: 'varchar', length: 10 })
  text_color: string;

  @Column({ type: 'varchar', length: 10 })
  link_color: string;

  @Column({ type: 'varchar', length: 10 })
  background_color: string;

  @Column({ type: 'varchar', length: 10 })
  container_color: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @OneToOne(() => Team, (team) => team.project)
  team: Team;
}
