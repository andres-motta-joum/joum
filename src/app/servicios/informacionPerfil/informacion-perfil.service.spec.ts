import { TestBed } from '@angular/core/testing';

import { InformacionPerfilService } from './informacion-perfil.service';

describe('InformacionPerfilService', () => {
  let service: InformacionPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
