// item.entity.ts
import {
  Entity,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { Jam } from '../jams/jams.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  project_title: string;

  @Column({ type: 'varchar', length: 100 })
  project_title_slug: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  slugifyProjectName() {
    const slugged = this.project_title.replace(' ', '-');
    this.project_title_slug = slugged.toLowerCase();
  }
}
