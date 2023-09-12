import {Component, Input} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input() mode: string = '';
    @Input() user: Cliente;

  constructor(private authService: AuthorizationService) {
      this.user = this.authService.getActiveUser();
  }
}
