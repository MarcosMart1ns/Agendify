import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {Constants} from "../../Constants";

@Component({
  selector: 'app-estabelecimento-details-dialog',
  templateUrl: './estabelecimento-details-dialog.component.html',
  styleUrls: ['./estabelecimento-details-dialog.component.css']
})
export class EstabelecimentoDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public estabelecimento: Estabelecimento) {

  }

  protected readonly Constants = Constants;
}
