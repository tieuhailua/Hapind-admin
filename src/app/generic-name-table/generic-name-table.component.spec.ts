import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericNameTableComponent } from './generic-name-table.component';

describe('GenericNameTableComponent', () => {
  let component: GenericNameTableComponent;
  let fixture: ComponentFixture<GenericNameTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericNameTableComponent]
    });
    fixture = TestBed.createComponent(GenericNameTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
