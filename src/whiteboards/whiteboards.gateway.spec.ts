import { Test, TestingModule } from '@nestjs/testing';
import { WhiteboardsGateway } from './whiteboards.gateway';

describe('WhiteboardsGateway', () => {
  let gateway: WhiteboardsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiteboardsGateway],
    }).compile();

    gateway = module.get<WhiteboardsGateway>(WhiteboardsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
