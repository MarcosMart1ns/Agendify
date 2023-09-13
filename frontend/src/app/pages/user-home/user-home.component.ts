import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {


  loggedUser!: Cliente;

  constructor(private authService: AuthorizationService,private router: Router) {
    let authenticated = this.authService.isUserLogged();

    if (!authenticated){
      router.navigateByUrl('/login');
    }
    this.authService.getActiveUser().subscribe(
      (response)=> this.loggedUser = <Cliente>response
    )

  }

}
