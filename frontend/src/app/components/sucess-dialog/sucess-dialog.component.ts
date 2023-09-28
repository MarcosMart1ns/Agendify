import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sucess-dialog',
  templateUrl: './sucess-dialog.component.html',
  styleUrls: ['./sucess-dialog.component.css']
})
export class SucessDialogComponent {
  @Input()showDialog: boolean = true;
  @Input() message:string = "Example Message";
  @Input()onConfirmAction = ()=>{}

  dismissDialog() {
    this.showDialog = false;
    this.onConfirmAction();
  }
}
