import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConfirmDialogData} from "../../model/dialog/ConfirmDialogData";

@Component({
  selector: 'app-success-dialog-modal',
  templateUrl: './success-dialog-modal.component.html',
  styleUrls: ['./success-dialog-modal.component.css','../confirm-dialog/confirm-dialog.component.css']
})
export class SuccessDialogModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

}
