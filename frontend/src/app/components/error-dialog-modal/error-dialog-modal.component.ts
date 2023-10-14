import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConfirmDialogData} from "../../model/dialog/ConfirmDialogData";

@Component({
  selector: 'app-error-dialog-modal',
  templateUrl: './error-dialog-modal.component.html',
  styleUrls: ['./error-dialog-modal.component.css','../confirm-dialog/confirm-dialog.component.css']
})
export class ErrorDialogModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }

}
