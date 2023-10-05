import { TestBed } from '@angular/core/testing';

import { NavegarProductoService } from './navegar-producto.service';

describe('NavegarProductoService', () => {
  let service: NavegarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
