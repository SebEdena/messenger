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

  @Get(':id')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(GetUserInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  delete(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.usersService.delete(user.id);
  }
}
