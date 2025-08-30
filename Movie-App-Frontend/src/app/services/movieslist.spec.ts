import { TestBed } from '@angular/core/testing';

import { Movieslist } from './movieslist';

describe('Movieslist', () => {
  let service: Movieslist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movieslist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
