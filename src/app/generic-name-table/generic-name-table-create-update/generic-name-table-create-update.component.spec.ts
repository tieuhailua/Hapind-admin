import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericNameTableCreateUpdateComponent } from './generic-name-table-create-update.component';

describe('GenericNameTableCreateUpdateComponent', () => {
  let component: GenericNameTableCreateUpdateComponent;
  let fixture: ComponentFixture<GenericNameTableCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericNameTableCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(GenericNameTableCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
