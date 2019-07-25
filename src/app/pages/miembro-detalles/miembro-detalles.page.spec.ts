import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroDetallesPage } from './miembro-detalles.page';

describe('MiembroDetallesPage', () => {
  let component: MiembroDetallesPage;
  let fixture: ComponentFixture<MiembroDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiembroDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembroDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
