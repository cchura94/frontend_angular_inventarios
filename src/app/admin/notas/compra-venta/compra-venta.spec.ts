import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraVenta } from './compra-venta';

describe('CompraVenta', () => {
  let component: CompraVenta;
  let fixture: ComponentFixture<CompraVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraVenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
