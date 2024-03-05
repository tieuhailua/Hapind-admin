import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectingComponent } from './expecting.component';

describe('ExpectingComponent', () => {
  let component: ExpectingComponent;
  let fixture: ComponentFixture<ExpectingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpectingComponent]
    });
    fixture = TestBed.createComponent(ExpectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
