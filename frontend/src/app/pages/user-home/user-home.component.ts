import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/response/Cliente';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { AgendamentoResponse } from 'src/app/model/response/AgendamentoResponse';
import { Estabelecimento } from 'src/app/model/response/Estabelecimento';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstabelecimentoService } from 'src/app/services/estabelecimento.service';
import { Authresponse } from 'src/app/model/response/Authresponse';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  loggedUser!: Cliente | Estabelecimento;

  agendamentos: AgendamentoResponse[] = []; // Inicialize a lista vazia aqui

  constructor(
    private authService: AuthorizationService,
    private agendaService: AgendaService,
    private router: Router,
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService
  ) {
    let authenticated: boolean = this.authService.isUserLogged();

    if (!authenticated) {
      this.router.navigateByUrl('/login');
    }

    let activeSession: Authresponse = this.authService.getActiveSession();

    if (activeSession.tipo == 1) {
      this.clienteService.getClienteLogado(activeSession.id).subscribe(
        (response) => {
          this.loggedUser = response;
          this.getAgendamentos();
        },
        () => {
          this.authService.logoutUser();
        }
      );
    }

    if (activeSession.tipo == 2) {
      this.estabelecimentoService
        .getEstabelecimento(activeSession.id)
        .subscribe(
          (response: Estabelecimento) => {
            this.loggedUser = response;
            this.getAgendamentos();
          },
          () => {
            this.authService.logoutUser();
          }
        );
    }
  }

  getAgendamentos() {
    console.log(this.loggedUser.constructor.name);
    this.agendaService
      .getUserCalendar(this.loggedUser.id)
      .subscribe((response) => {
        this.agendamentos = response;
        this.agendamentos.sort(
          (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
        );
        console.log('agendamento callback na homepage');
        console.log(this.agendamentos);
      });
  }
}
