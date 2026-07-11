import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottoCard } from './prodotto-card';

describe('ProdottoCard', () => {
  let component: ProdottoCard;
  let fixture: ComponentFixture<ProdottoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdottoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdottoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
