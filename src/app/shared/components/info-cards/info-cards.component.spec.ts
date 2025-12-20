import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardsComponent } from './info-cards.component';

describe('InfoCardsComponent', () => {
  let component: InfoCardsComponent;
  let fixture: ComponentFixture<InfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
