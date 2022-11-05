// item.entity.ts
import {
  Entity,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { FavouritedProjects } from '../favourited-projects/favourited-projects.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  project_title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  project_title_slug: string;

  @Column({ type: 'varchar', length: 300 })
  project_description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  youtube_url: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  github_url: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  live_site_url: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  header_image: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  background_image: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  text_color: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  link_color: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  background_color: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  container_color: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @OneToOne(() => Team, (team) => team.project)
  team: Team;

  @OneToMany(() => FavouritedProjects, (fav_projects) => fav_projects.project)
  favourited_by: FavouritedProjects[];

  @BeforeInsert()
  @BeforeUpdate()
  slugifyProjectName() {
    const slugged = this.project_title.replace(' ', '-');
    this.project_title_slug = slugged.toLowerCase();
  }
}
