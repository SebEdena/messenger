import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CrudService } from 'src/_shared/crud.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService extends CrudService<User> implements OnModuleInit {
  private hashParams: { saltRounds: number };

  constructor(
    private config: ConfigService,
    protected repository: Repository<User>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.hashParams = this.config.get('hash');
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.hashParams.saltRounds,
    );
    await super.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
    });
  }
}
