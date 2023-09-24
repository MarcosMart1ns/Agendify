import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAgendamentoClienteComponent } from './card-agendamento-cliente.component';

describe('CardAgendamentoClienteComponent', () => {
  let component: CardAgendamentoClienteComponent;
  let fixture: ComponentFixture<CardAgendamentoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAgendamentoClienteComponent]
    });
    fixture = TestBed.createComponent(CardAgendamentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
