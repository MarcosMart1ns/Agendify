import {Component, Input} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";
import {Estabelecimento} from "../../model/response/Estabelecimento";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() mode: string = '';

  @Input()
  user!: Cliente | Estabelecimento;


  protected readonly window = window;
}
