// item.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
// import { User } from 'src/modules/users/entities/User.entity';

@Entity({ name: 'jams' })
export class Jam extends BaseEntity {
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

  // Relations
  // @OneToMany(() => ProductComment, (comment) => comment.product_id)
  // comments: ProductComment[];

  // @OneToMany(() => ProductLike, (like) => like.product_id)
  // likes: ProductLike[];

  // @ManyToOne(() => ProductCategory, (category) => category.id)
  // @JoinColumn({ name: 'category_id' })
  // category_id: number;

  // @ManyToOne(() => User, (user) => user.id)
  // @JoinColumn({ name: 'seller_id' })
  // seller_id: number;

  // @ManyToOne(() => User, (user) => user.id)
  // @JoinColumn({ name: 'buyer_id' })
  // buyer_id: number;
}
