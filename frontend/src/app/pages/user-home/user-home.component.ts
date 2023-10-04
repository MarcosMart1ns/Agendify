import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  loggedUser!: Cliente | Estabelecimento ;

  agendamentos: AgendamentoResponse[] = []; // Inicialize a lista vazia aqui

  constructor(
    private authService: AuthorizationService,
    private agendaService: AgendaService,
    private router: Router
  ,
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
        (response) => this.loggedUser = response,
        () => {
          this.authService.logoutUser();
        }
      )
    }

    if (activeSession.tipo == 2) {
      this.estabelecimentoService.getEstabelecimentoLogado(activeSession.id).subscribe(
        (response: Estabelecimento) => this.loggedUser = response,
        () => {
          this.authService.logoutUser();
        }
      )
    }

  }

}
