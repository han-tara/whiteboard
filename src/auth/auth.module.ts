import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { AccessStrategy, RefreshStrategy } from './strategy';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, RefreshStrategy, AccessStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
