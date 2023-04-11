import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/_shared/crud.service';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { Repository } from 'typeorm';

export type JwtPayload = {
  uid: string;
  sub: string;
};

@Injectable()
export class TokenService extends CrudService<RefreshToken> {
  private jwtAccessConfig: JwtSignOptions;

  private jwtRefreshConfig: JwtSignOptions;

  constructor(
    @InjectRepository(RefreshToken)
    protected repository: Repository<RefreshToken>,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {
    super(repository);
    this.jwtAccessConfig = this.config.get('jwt.access');
    this.jwtRefreshConfig = this.config.get('jwt.refresh');
  }

  public async generateTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          uid: userId,
          sub: userId,
        } as JwtPayload,
        this.jwtAccessConfig,
      ),
      this.jwtService.signAsync(
        {
          uid: userId,
          sub: userId,
        } as JwtPayload,
        this.jwtRefreshConfig,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const token = await this.findOne({ userId, refreshToken });
    if (!token) {
      throw new UnauthorizedException();
    }
    const tokens = await this.generateTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async clearRefreshToken(userId: string) {
    await this.repository.delete({ userId });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.repository.upsert({ userId, refreshToken }, ['userId']);
  }
}
