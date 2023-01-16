import { TestBed } from '@angular/core/testing';

import { ApiServesService } from './api-serves.service';

describe('ApiServesService', () => {
  let service: ApiServesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
