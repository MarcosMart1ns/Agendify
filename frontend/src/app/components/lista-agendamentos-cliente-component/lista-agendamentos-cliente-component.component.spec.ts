import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendamentosClienteComponentComponent } from './lista-agendamentos-cliente-component.component';

describe('ListaAgendamentosClienteComponentComponent', () => {
  let component: ListaAgendamentosClienteComponentComponent;
  let fixture: ComponentFixture<ListaAgendamentosClienteComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAgendamentosClienteComponentComponent]
    });
    fixture = TestBed.createComponent(ListaAgendamentosClienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
