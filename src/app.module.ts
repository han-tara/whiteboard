import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WhiteboardsModule } from './whiteboards/whiteboards.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal:true}), AuthModule, WhiteboardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
