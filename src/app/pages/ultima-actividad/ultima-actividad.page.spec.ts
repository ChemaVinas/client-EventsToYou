import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimaActividadPage } from './ultima-actividad.page';

describe('UltimaActividadPage', () => {
  let component: UltimaActividadPage;
  let fixture: ComponentFixture<UltimaActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimaActividadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimaActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
