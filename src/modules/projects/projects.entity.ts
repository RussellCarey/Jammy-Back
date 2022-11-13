// item.entity.ts
import {
  Entity,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { Favourite } from '../favourite/favourite.entity';
import { Comment } from '../comments/comments.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Index(['team_id'])
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

  @Column({ type: 'int', default: 0 })
  favourites: number;

  @Column({ nullable: false })
  team_id: number;

  @OneToOne(() => Team, (team) => team.project)
  @JoinColumn()
  team: Team;

  @OneToMany(() => Favourite, (fav_projects) => fav_projects.project)
  favourited_by: Favourite[];

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  slugifyProjectName() {
    const slugged = this.project_title.replace(' ', '-');
    this.project_title_slug = slugged.toLowerCase();
  }
}
