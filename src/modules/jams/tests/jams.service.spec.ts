import { Test, TestingModule } from '@nestjs/testing';
import { JamServices } from '../jams.service';

describe('JamServices', () => {
  let service: JamServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JamServices],
    }).compile();

    service = module.get<JamServices>(JamServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
