import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAgendamentoEstabelecimentoComponent } from './card-agendamento-estabelecimento.component';

describe('CardAgendamentoEstabelecimentoComponent', () => {
  let component: CardAgendamentoEstabelecimentoComponent;
  let fixture: ComponentFixture<CardAgendamentoEstabelecimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAgendamentoEstabelecimentoComponent]
    });
    fixture = TestBed.createComponent(CardAgendamentoEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
