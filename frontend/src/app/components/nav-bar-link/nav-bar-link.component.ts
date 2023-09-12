import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-bar-link',
  templateUrl: './nav-bar-link.component.html',
  styleUrls: ['./nav-bar-link.component.css']
})
export class NavBarLinkComponent {
  @Input() buttonName :string = "defaultName";
  @Input() url :string = "";
}
