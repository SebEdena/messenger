import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/resources/users/services/bcrypt/bcrypt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CrudService } from 'src/_shared/crud.service';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
    private bcrypt: BcryptService,
  ) {
    super(repository);
  }

  async create(createUserDto: CreateUserDto) {
    const userInDb = await this.repository.findOneBy({
      email: createUserDto.email,
    });

    if (userInDb) {
      throw new HttpException(
        `User ${createUserDto.email} already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this.bcrypt.hashPassword(
      createUserDto.password,
    );

    return await super.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
      rooms: [],
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne({ email });
    if (user && this.bcrypt.comparePasswords(password, user.password)) {
      return user;
    }
    return null;
  }
}
