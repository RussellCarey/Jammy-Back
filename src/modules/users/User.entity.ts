// item.entity.ts
import { Entity, Column, OneToMany, Index } from 'typeorm';
import { IsInt, Length, IsEmail, IsFQDN, IsString } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { Team } from '../teams/teams.entity';

//TODO - Set up another module for the join table?
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Index(['email'], { unique: true })
  //
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  github_id: string;

  @Column({ type: 'varchar' })
  github_username: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  @Length(2, 100)
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ type: 'varchar', default: '' })
  @IsString()
  stripe_customer_token: string;

  @Column({ type: 'varchar', length: 200 })
  @IsFQDN()
  image: string;

  // Relations
  @OneToMany(() => Team, (team) => team.user)
  teams: Team[];
}
