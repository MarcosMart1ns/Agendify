import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogModalComponent } from './success-dialog-modal.component';

describe('SuccessDialogModalComponent', () => {
  let component: SuccessDialogModalComponent;
  let fixture: ComponentFixture<SuccessDialogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessDialogModalComponent]
    });
    fixture = TestBed.createComponent(SuccessDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
