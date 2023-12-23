import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilsCardComponent } from './wils-card.component';

describe('WilsCardComponent', () => {
  let component: WilsCardComponent;
  let fixture: ComponentFixture<WilsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WilsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
