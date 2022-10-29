// item.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  project_title: string;

  @Column({ type: 'varchar', length: 100 })
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

  @Column({ type: 'varchar', length: 100 })
  text_color: string;

  @Column({ type: 'varchar', length: 100 })
  link_color: string;

  @Column({ type: 'varchar', length: 100 })
  background_color: string;

  @Column({ type: 'varchar', length: 100 })
  container_color: string;

  @Column({ type: 'int', default: 0 })
  views: number;
}
