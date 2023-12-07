import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarComponent } from './home-car.component';

describe('HomeCarComponent', () => {
  let component: HomeCarComponent;
  let fixture: ComponentFixture<HomeCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
