import {Component} from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";
import {Cliente} from "../../model/response/Cliente";
import {HttpErrorResponse} from "@angular/common/http";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {ClienteService} from "../../services/cliente.service";
import {EstabelecimentoService} from "../../services/estabelecimento.service";

@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.css']
})
export class SearchHomePageComponent {

  isUserLogged:boolean = false;
  loggedUser!:Cliente | Estabelecimento;

  constructor(
    private authService:AuthorizationService,
    private estabelecimentoService: EstabelecimentoService,
    private clienteService: ClienteService,
    ) {
    this.isUserLogged = this.authService.isUserLogged();

    if (this.authService.isUserLogged()) {
      if (this.authService.getActiveSession().tipo == 1) {
        this.clienteService.getClienteLogado(this.authService.getActiveSession().id)
          .subscribe(
            (response: Cliente) => {
              this.loggedUser = response;
            },
            (error: HttpErrorResponse) => {
              this.authService.logoutUser();
            }
          );
      }

      if (this.authService.getActiveSession().tipo == 2) {
        this.estabelecimentoService.getEstabelecimentoLogado(this.authService.getActiveSession().id)
          .subscribe(
            (response: Estabelecimento) => {
              this.loggedUser = response;
            },
            (error: HttpErrorResponse) => {
              this.authService.logoutUser();
            }
          );
      }
    }
  }
}
