import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { UserDTO } from './users.dto';

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

  async findOneByGithubId(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { github_id: id } });
  }

  async getAll(params: {
    order?: any;
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<User[]> {
    const { skip, take, order } = params;
    const jam = await this.userRepository.find({
      skip,
      take,
      order,
    });
    return jam;
  }

  async save(user: User): Promise<User> {
    const createdUser = await this.userRepository.save(user);
    return createdUser;
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
