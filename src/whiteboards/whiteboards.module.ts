import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WhiteboardsGateway } from './whiteboards.gateway';

@Module({
  imports: [JwtModule.register({})],
  providers: [WhiteboardsGateway]
})
export class WhiteboardsModule {}
