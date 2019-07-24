import { TestBed } from '@angular/core/testing';

import { ProveedorSesionesService } from './proveedor-sesiones.service';

describe('ProveedorSesionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorSesionesService = TestBed.get(ProveedorSesionesService);
    expect(service).toBeTruthy();
  });
});
