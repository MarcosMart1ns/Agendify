import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendamentosEstabelecimentoComponentComponent } from './lista-agendamentos-estabelecimento-component.component';

describe('ListaAgendamentosEstabelecimentoComponentComponent', () => {
  let component: ListaAgendamentosEstabelecimentoComponentComponent;
  let fixture: ComponentFixture<ListaAgendamentosEstabelecimentoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAgendamentosEstabelecimentoComponentComponent]
    });
    fixture = TestBed.createComponent(ListaAgendamentosEstabelecimentoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
