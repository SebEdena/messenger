import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto, RefreshTokenDto } from 'common/dtos';
import { User } from 'common/entities';
import { AuthService } from './auth.service';
import { ConnectedUser } from './decorators/connected-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { ConnectedUserInterceptor } from './interceptors/connected-user.interceptor';

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
  @UseInterceptors(ConnectedUserInterceptor)
  @Post('refresh')
  async refresh(@ConnectedUser() user: User, @Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(user.id, refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ConnectedUserInterceptor)
  @Get('logout')
  async logout(@ConnectedUser() userId: string) {
    await this.authService.logout(userId);
  }
}
