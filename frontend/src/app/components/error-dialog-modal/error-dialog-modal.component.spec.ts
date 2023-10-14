import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogModalComponent } from './error-dialog-modal.component';

describe('ErrorDialogModalComponent', () => {
  let component: ErrorDialogModalComponent;
  let fixture: ComponentFixture<ErrorDialogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogModalComponent]
    });
    fixture = TestBed.createComponent(ErrorDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
