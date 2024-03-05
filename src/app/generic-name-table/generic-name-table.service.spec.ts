import { TestBed } from '@angular/core/testing';

import { GenericNameTableService } from './generic-name-table.service';

describe('GenericNameTableService', () => {
  let service: GenericNameTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericNameTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
