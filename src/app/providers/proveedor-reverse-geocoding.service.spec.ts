import { TestBed } from '@angular/core/testing';

import { ProveedorReverseGeocodingService } from './proveedor-reverse-geocoding.service';

describe('ProveedorReverseGeocodingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorReverseGeocodingService = TestBed.get(ProveedorReverseGeocodingService);
    expect(service).toBeTruthy();
  });
});
