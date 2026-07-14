import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottoDettaglio } from './prodotto-dettaglio';

describe('ProdottoDettaglio', () => {
  let component: ProdottoDettaglio;
  let fixture: ComponentFixture<ProdottoDettaglio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdottoDettaglio],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdottoDettaglio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
