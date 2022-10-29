import { Test, TestingModule } from '@nestjs/testing';
import { ProjectServices } from '../projects.service';

describe('ProjectServices', () => {
  let service: ProjectServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectServices],
    }).compile();

    service = module.get<ProjectServices>(ProjectServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
