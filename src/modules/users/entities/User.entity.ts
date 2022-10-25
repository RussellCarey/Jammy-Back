// item.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { IsInt, Length, IsEmail, IsFQDN, IsString } from 'class-validator';

import { BaseEntity } from '../../../entities/base.entity';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  //
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  @Length(2, 50)
  second_name: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  @Length(2, 100)
  email: string;

  @Column({ type: 'varchar' })
  @Length(8, 50)
  password: string;

  @Column({ type: 'int' })
  @IsInt()
  phone_number: number;

  @Column({ type: 'varchar' })
  @IsString()
  stripe_customer_token: string;

  @Column({ type: 'varchar' })
  @IsString()
  location: string;

  @Column({ type: 'varchar', length: 200 })
  @IsFQDN()
  image: string;

  // Relations
  // @OneToMany(() => ProductComment, (comment) => comment.product_id)
  // comments: ProductComment[];

  // @OneToMany(() => Product, (product) => product.buyer_id)
  // bought_products: Product[];

  // @OneToMany(() => Product, (product) => product.seller_id)
  // products: Product[];

  // Functions
  public set _id(id: number) {
    this.id = id;
  }

  public get _email(): string {
    return this.email;
  }

  public set _email(email: string) {
    this.email = email;
  }
}
