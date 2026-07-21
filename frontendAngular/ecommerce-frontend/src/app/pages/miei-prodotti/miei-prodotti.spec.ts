import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MieiProdotti } from './miei-prodotti';

describe('MieiProdotti', () => {
  let component: MieiProdotti;
  let fixture: ComponentFixture<MieiProdotti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MieiProdotti],
    }).compileComponents();

    fixture = TestBed.createComponent(MieiProdotti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
