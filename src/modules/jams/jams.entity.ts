// item.entity.ts
import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { Project } from '../projects/projects.entity';

@Entity({ name: 'jams' })
export class Jam extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  jam_title: string;

  @Column({ type: 'varchar', length: 100 })
  jam_title_slug: string;

  @Column({ type: 'varchar', length: 300 })
  jam_description: string;

  @Column({ type: 'varchar', length: 300 })
  jam_image: string;

  @Column({})
  jam_brief: string;

  @Column()
  launch_date: number;

  @Column({})
  start_date: number;

  @Column({})
  end_date: number;

  @Column({ default: false })
  isAuthorized: boolean;

  // Relations
  @OneToMany(() => Team, (team) => team.user)
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    const slugged = this.jam_title.replace(' ', '-');
    this.jam_title_slug = slugged.toLowerCase();
  }
}
