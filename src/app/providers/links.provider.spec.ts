import { TestBed } from '@angular/core/testing';

import { LinksProvider } from './links.provider';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LinksProvider', () => {
  let service: LinksProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LinksProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
