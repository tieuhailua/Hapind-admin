import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyComponent } from './hobby.component';

describe('HobbyComponent', () => {
  let component: HobbyComponent;
  let fixture: ComponentFixture<HobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyComponent]
    });
    fixture = TestBed.createComponent(HobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
