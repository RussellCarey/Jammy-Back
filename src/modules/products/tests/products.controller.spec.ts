import { Test, TestingModule } from '@nestjs/testing';
import { JamController } from '../controllers/jams.controller';

describe('JamController', () => {
  let controller: JamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JamController],
    }).compile();

    controller = module.get<JamController>(JamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
