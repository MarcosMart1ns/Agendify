import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {AuthorizationService} from "../../services/authorization.service";
import { AgendaService } from 'src/app/services/agenda.service';
import {Router} from "@angular/router";
import { AgendamentoResponse } from 'src/app/model/response/AgendamentoResponse';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  loggedUser!: Cliente;

  agendamentos: AgendamentoResponse[] = []; // Inicialize a lista vazia aqui

  constructor(
    private authService: AuthorizationService,
    private agendaService: AgendaService,
    private router: Router
  ) {
    let authenticated = this.authService.isUserLogged();

    if (!authenticated) {
      router.navigateByUrl('/login');
    }
    this.authService.getActiveUser().subscribe((response) => {
      this.loggedUser = <Cliente>response;
      this.agendaService
        .getUserCalendar(this.loggedUser.id)
        .subscribe((response) => this.agendamentos = response);
    });
  }
}
