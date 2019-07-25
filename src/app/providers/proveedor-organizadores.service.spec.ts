import { TestBed } from '@angular/core/testing';

import { ProveedorOrganizadoresService } from './proveedor-organizadores.service';

describe('ProveedorOrganizadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorOrganizadoresService = TestBed.get(ProveedorOrganizadoresService);
    expect(service).toBeTruthy();
  });
});
