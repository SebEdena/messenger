import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'common/dtos';
import { UsersService } from 'src/resources/users/users.service';
import { TokenService } from './services/token/token.service';

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService, private usersService: UsersService) {}

  private async handleTokens(userId: string) {
    const tokens = await this.tokenService.generateTokens(userId);
    await this.tokenService.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.handleTokens(user.id);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.validateUser(loginDto.email, loginDto.password);
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
