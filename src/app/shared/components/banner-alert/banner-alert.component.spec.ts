import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAlertComponent } from './banner-alert.component';

describe('BannerAlertComponent', () => {
  let component: BannerAlertComponent;
  let fixture: ComponentFixture<BannerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
