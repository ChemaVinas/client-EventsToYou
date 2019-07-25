import { TestBed } from '@angular/core/testing';

import { ProveedorMiembrosService } from './proveedor-miembros.service';

describe('ProveedorMiembrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorMiembrosService = TestBed.get(ProveedorMiembrosService);
    expect(service).toBeTruthy();
  });
});
