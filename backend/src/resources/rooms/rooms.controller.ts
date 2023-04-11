import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConnectedUserInterceptor } from '../../auth/interceptors/connected-user.interceptor';
import { ConnectedUser } from 'src/auth/decorators/connected-user.decorator';
import { GetRoom } from './decorators/get-room.decorator';
import { User } from '../users/entities/user.entity';
import { GetRoomInterceptor } from './interceptors/get-room.interceptor';
import { Room } from './entities/room.entity';

@ApiTags('rooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ConnectedUserInterceptor)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @ConnectedUser() user: User) {
    return this.roomsService.createRoom(createRoomDto, user);
  }

  @Get()
  findAll() {
    return this.roomsService.find();
  }

  @Get(':id')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetRoom() room: Room) {
    return room;
  }

  @Patch(':id')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @GetRoom() room: Room,
  ) {
    return this.roomsService.update(room, updateRoomDto);
  }

  @Delete(':id')
  @UseInterceptors(GetRoomInterceptor)
  @ApiParam({ name: 'id', format: 'uuid', type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string, @GetRoom() room: Room) {
    return this.roomsService.delete(room.id);
  }
}
