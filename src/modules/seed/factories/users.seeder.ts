import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { User } from 'src/modules/users/users.entity';
import { faker } from '@faker-js/faker';
import { SeederInterface } from '../seeder.interface';

@Injectable()
export class UsersSeeder implements SeederInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const numberOfItemsToAdd = 10;
    const data: Partial<User>[] = [];

    for (let i = 0; i < numberOfItemsToAdd; i++) {
      data.push({
        // Insert object of data for each item..
        name: faker.name.fullName(),
        github_id: faker.random.word(),
        github_username: faker.random.word(),
        email: faker.internet.email(),
        isAdmin: false,
        isBanned: faker.datatype.boolean(),
        phone_number: 0,
        stripe_customer_token: 'null',
        location: 'earth',
        image: 'https://randomuser.me/api/portraits/women/88.jpg',
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.userRepository.insert(data);
    });
  }
}
