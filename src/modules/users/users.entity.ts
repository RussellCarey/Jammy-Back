// item.entity.ts
import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany, Index, ManyToMany } from 'typeorm';
import { IsInt, Length, IsEmail, IsFQDN, IsString } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { Comment } from '../comments/comments.entity';
import { Favourite } from '../favourite/favourite.entity';
import { Achievement } from '../achievements/achievements.entity';

//TODO - Set up another module for the join table?
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Index(['email', 'github_id'], { unique: true })
  //
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  @Length(2, 50)
  github_username: string;

  @Column({ type: 'varchar' })
  @Length(2, 50)
  github_id: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  @Length(2, 100)
  email: string;

  @Exclude()
  @Column({ default: false })
  isAdmin: boolean;

  @Exclude()
  @Column({ default: false })
  isBanned: boolean;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  phone_number: number;

  @Exclude()
  @Column({ type: 'varchar', default: 'null' })
  @IsString()
  stripe_customer_token: string;

  @Column({ type: 'varchar', default: 'null' })
  @IsString()
  location: string;

  @Column({ type: 'varchar', length: 200 })
  @IsFQDN()
  image: string;

  @Column({ type: 'varchar', length: 50, default: null })
  @IsString()
  last_ip: string;

  // Relations
  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @OneToMany(() => Favourite, (fav_projects) => fav_projects.user)
  favourites: Favourite[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Achievement, (achievement) => achievement.users)
  achievements: Achievement[];
}
