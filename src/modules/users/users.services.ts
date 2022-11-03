import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './users.dto';
import { UserUpdateDTO } from './users.update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneBy(key: string, value: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { [key]: value } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async find(): Promise<User[] | undefined> {
    const users = await this.userRepository.find();
    return users;
  }

  async save(user: UserDTO): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<User | undefined> {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser.raw[0];
  }

  async update(id: number, user: UserDTO): Promise<User | UpdateResult> {
    const updatedUser = await this.userRepository
      .createQueryBuilder()
      .update(User, user)
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return updatedUser.raw[0];
  }
}
