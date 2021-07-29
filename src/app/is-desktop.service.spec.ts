import { TestBed } from '@angular/core/testing';

import { IsDesktopService } from './is-desktop.service';

describe('IsDesktopService', () => {
  let service: IsDesktopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsDesktopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
