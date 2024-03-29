import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/resources/users/users.module';
import { UsersService } from 'src/resources/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokenService } from './services/token/token.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { User } from 'src/resources/users/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    TypeOrmModule.forFeature([RefreshToken, User]),
    UsersModule,
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, AuthService, TokenService],
  controllers: [AuthController],
  exports: [TypeOrmModule],
})
export class AuthModule {}
