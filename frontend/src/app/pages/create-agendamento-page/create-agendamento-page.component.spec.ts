import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgendamentoPageComponent } from './create-agendamento-page.component';

describe('CreateAgendamentoPageComponent', () => {
  let component: CreateAgendamentoPageComponent;
  let fixture: ComponentFixture<CreateAgendamentoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAgendamentoPageComponent]
    });
    fixture = TestBed.createComponent(CreateAgendamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
