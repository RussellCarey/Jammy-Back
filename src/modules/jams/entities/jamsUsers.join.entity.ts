import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/User.entity';
import { Jam } from './jams.entity';

@Entity()
export class JamsUsers {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public user_id!: number;

  @Column()
  public jam_id!: number;

  @Column()
  public role!: string;

  @ManyToOne(() => User, (user) => user.jams_users)
  public users!: User;

  @ManyToOne(() => Jam, (jam) => jam.jams_users)
  public jams!: Jam;
}
