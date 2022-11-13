// item.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { Comment } from '../comments/comments.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'jams' })
export class Jam extends BaseEntity {
  @Index(['launch_date', 'jam_title'])
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

  @Exclude()
  @Column({ default: false })
  is_authorized: boolean;

  @Exclude()
  @Column({ default: false })
  has_started: boolean;

  // Relations
  @OneToMany(() => Team, (team) => team.users)
  teams: Team[];

  @OneToMany(() => Comment, (comment) => comment.jam)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    const slugged = this.jam_title.replace(' ', '-');
    this.jam_title_slug = slugged.toLowerCase();
  }
}
