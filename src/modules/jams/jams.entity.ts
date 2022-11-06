// item.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';

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

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  launch_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  start_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDate()
  end_date: Date;

  @Column({ default: false })
  is_authorized: boolean;

  @Column({ default: false })
  has_started: boolean;

  // Relations
  @OneToMany(() => Team, (team) => team.users)
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    const slugged = this.jam_title.replace(' ', '-');
    this.jam_title_slug = slugged.toLowerCase();
  }
}
