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
  loggedUser!: Cliente;

  agendamentos = [
    {
      nome: 'Josiel',
      urlImagem: 'https://via.placeholder.com/60x61',
      status: 'Cancelado',
      tipo: 'Instalação',
      dataHora: '23/11/2023 09:00',
    },
    {
      nome: 'Josiel2',
      urlImagem: 'https://via.placeholder.com/60x61',
      status: 'Agendado',
      tipo: 'Instalação',
      dataHora: '23/11/2023 09:00'
    },
    {
      nome: 'Josiel3',
      urlImagem: 'https://via.placeholder.com/60x61',
      status: 'Concluido',
      tipo: 'Instalação',
      dataHora: '23/11/2023 09:00'
    },
  ];

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {
    let authenticated = this.authService.isUserLogged();

    if (!authenticated) {
      router.navigateByUrl('/login');
    }
    this.authService
      .getActiveUser()
      .subscribe((response) => (this.loggedUser = <Cliente>response));
  }
}
