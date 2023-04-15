import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConnectedUserInterceptor } from '../../auth/interceptors/connected-user.interceptor';
import { UsersService } from './users.service';
import { ConnectedUser } from 'src/auth/decorators/connected-user.decorator';
import { GetUserInterceptor } from './interceptors/get-user.interceptor';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ConnectedUserInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ConnectedUser() user: User) {
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.find();
  }

  @Get(':userId')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'userId', format: 'uuid', type: 'string' })
  findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @GetUser() user: User,
  ) {
    return user;
  }

  @Patch(':userId')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'userId', format: 'uuid', type: 'string' })
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':userId')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'userId', format: 'uuid', type: 'string' })
  delete(
    @Param('userId', ParseUUIDPipe) userId: string,
    @GetUser() user: User,
  ) {
    return this.usersService.delete(user.id);
  }
}
