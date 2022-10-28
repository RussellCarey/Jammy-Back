import { Test, TestingModule } from '@nestjs/testing';
import { TeamServices } from '../teams.service';

describe('TeamServices', () => {
  let service: TeamServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamServices],
    }).compile();

    service = module.get<TeamServices>(TeamServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
