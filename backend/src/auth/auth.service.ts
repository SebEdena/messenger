import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { UsersService } from 'src/resources/users/users.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './services/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  private async handleTokens(userId: string) {
    const tokens = await this.tokenService.generateTokens(userId);
    await this.tokenService.refreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.handleTokens(user.id);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.handleTokens(user.id);
  }

  async refreshToken(userId: string, refreshToken: string) {
    return await this.tokenService.refreshToken(userId, refreshToken);
  }

  async logout(userId: string) {
    this.tokenService.clearRefreshToken(userId);
  }
}
