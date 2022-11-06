// item.entity.ts
import {
  Entity,
  Column,
  OneToMany,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsInt, Length, IsEmail, IsFQDN, IsString } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { Team } from '../teams/teams.entity';
import { FavouritedProjects } from '../favourited-projects/favourited-projects.entity';

//TODO - Set up another module for the join table?
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Index(['email'], { unique: true })
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

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  phone_number: number;

  @Column({ type: 'varchar', default: 'null' })
  @IsString()
  stripe_customer_token: string;

  @Column({ type: 'varchar', default: 'null' })
  @IsString()
  location: string;

  @Column({ type: 'varchar', length: 200 })
  @IsFQDN()
  image: string;

  // Relations
  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @OneToMany(() => FavouritedProjects, (fav_projects) => fav_projects.user)
  favourite_projects: FavouritedProjects[];
}
