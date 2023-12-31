import {Component, Input} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {Estabelecimento} from "../../model/response/Estabelecimento";

@Component({
  selector: 'app-logged-user-nav-bar',
  templateUrl: './logged-user-nav-bar.component.html',
  styleUrls: ['./logged-user-nav-bar.component.css']
})
export class LoggedUserNavBarComponent {

  @Input()activeUser: Cliente | null | Estabelecimento = null;


  constructor(private authService:AuthorizationService,private router: Router) {
  }

  logout() {
    this.authService.logoutUser();
  }

}
