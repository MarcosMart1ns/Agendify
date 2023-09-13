import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.css']
})
export class SearchHomePageComponent {

  isUserLogged:boolean = false;

  constructor(private authService:AuthorizationService) {
    this.isUserLogged = this.authService.isUserLogged();
  }
}
