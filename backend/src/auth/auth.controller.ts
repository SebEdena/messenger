import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '../resources/users/decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/resources/users/entities/user.entity';
import { UserInterceptor } from 'src/resources/users/interceptors/user.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return await this.authService.refreshToken(
      user.id,
      refreshTokenDto.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get('logout')
  async logout(@CurrentUser() userId: string) {
    await this.authService.logout(userId);
  }
}
