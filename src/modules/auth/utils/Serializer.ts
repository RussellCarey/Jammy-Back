import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super();
  }

  // How to serialze the session.
  async serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  // Take user and attach to req.user. Unpack.
  async deserializeUser(user: any, done: (err, user: User) => void) {
    const foundUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    console.log('IN DESERIALIZE');
    console.log(user);
    return foundUser ? foundUser : done(null, null);
  }
}
