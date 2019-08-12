import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedasPage } from './busquedas.page';

describe('BusquedasPage', () => {
  let component: BusquedasPage;
  let fixture: ComponentFixture<BusquedasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
