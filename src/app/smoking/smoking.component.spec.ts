import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokingComponent } from './smoking.component';

describe('SmokingComponent', () => {
  let component: SmokingComponent;
  let fixture: ComponentFixture<SmokingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmokingComponent]
    });
    fixture = TestBed.createComponent(SmokingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
