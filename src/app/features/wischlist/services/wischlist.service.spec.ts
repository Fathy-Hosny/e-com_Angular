import { TestBed } from '@angular/core/testing';

import { WischlistService } from './wischlist.service';

describe('WischlistService', () => {
  let service: WischlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WischlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
