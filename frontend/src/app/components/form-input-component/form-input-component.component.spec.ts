import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponentComponent } from './form-input-component.component';

describe('FormInputComponentComponent', () => {
  let component: FormInputComponentComponent;
  let fixture: ComponentFixture<FormInputComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInputComponentComponent]
    });
    fixture = TestBed.createComponent(FormInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
