// item.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { IsDate, IsDateString } from 'class-validator';
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

  @Column({ type: 'varchar', length: 300, default: ' ' })
  jam_image: string;

  @Column({ type: 'varchar', length: 300 })
  jam_brief: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDateString()
  launch_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDateString()
  start_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsDateString()
  end_date: Date;

  @Column({ default: false })
  isAuthorized: boolean;

  // Relations
  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    const slugged = this.jam_title.replace(' ', '-');
    this.jam_title_slug = slugged.toLowerCase();
  }
}
