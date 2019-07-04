import { TestBed } from '@angular/core/testing';

import { ProveedorEventosService } from './proveedor-eventos.service';

describe('ProveedorEventosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorEventosService = TestBed.get(ProveedorEventosService);
    expect(service).toBeTruthy();
  });
});
