import { Test, TestingModule } from '@nestjs/testing';
import { ReporstService } from './reporst.service';

describe('ReporstService', () => {
  let service: ReporstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReporstService],
    }).compile();

    service = module.get<ReporstService>(ReporstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
