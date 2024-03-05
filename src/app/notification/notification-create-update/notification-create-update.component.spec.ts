import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCreateUpdateComponent } from './notification-create-update.component';

describe('NotificationCreateUpdateComponent', () => {
  let component: NotificationCreateUpdateComponent;
  let fixture: ComponentFixture<NotificationCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(NotificationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
