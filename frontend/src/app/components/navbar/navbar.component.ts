import {Component, Input} from '@angular/core';
import {Cliente} from "../../model/response/Cliente";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() mode: string = '';

  @Input()
  user!: Cliente;

  constructor() {
  }

  protected readonly window = window;
}
