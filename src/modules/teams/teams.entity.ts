// item.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from '../users/User.entity';

@Entity({ name: 'jams' })
export class Team extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  jam_title: string;

  @Column({ type: 'varchar', length: 300 })
  jam_description: string;

  @Column({ type: 'varchar', length: 300 })
  jam_image: string;

  @Column({})
  jam_brief: string;

  @Column()
  launch_date: number;

  @Column()
  start_date: number;

  @Column()
  end_date: number;
}
