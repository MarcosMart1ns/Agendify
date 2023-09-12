import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponentComponent } from './logo-component.component';

describe('LogoComponentComponent', () => {
  let component: LogoComponentComponent;
  let fixture: ComponentFixture<LogoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponentComponent]
    });
    fixture = TestBed.createComponent(LogoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
