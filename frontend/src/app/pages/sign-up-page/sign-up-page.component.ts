import {Component} from '@angular/core';
import {FieldModel} from "../../model/field-model/FieldModel";
import {ClienteFormGroup} from "../../model/form-model/signup/ClienteFormGroup";
import {ClienteFieldControl} from "../../model/field-model/signup/ClienteFieldControl";
import {EstabelecimentoFieldControl} from "../../model/field-model/signup/EstabelecimentoFieldControl";
import {ClienteService} from "../../services/cliente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EstabelecimentoFormGroup} from "../../model/form-model/signup/EstabelecimentoFormGroup";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {ErrorDialogModalComponent} from "../../components/error-dialog-modal/error-dialog-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  clienteFormGroup= ClienteFormGroup.model;
  clienteFormField: FieldModel[] = ClienteFieldControl.fields;

  estabelecimentoFormGroup = EstabelecimentoFormGroup.model;
  estabelecimntoFormField: FieldModel[] = EstabelecimentoFieldControl.fields;

  enableClienteField: boolean = true;
  enableEstabelecimentoField: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService,
    private authService:AuthorizationService,
    private router:Router,
    private dialog: MatDialog
  ) {

    if(this.authService.isUserLogged()){
      this.router.navigateByUrl('/home');
    }

  }

  submitCliente(cliente: ClienteFormGroup) {
    const onSuccess = () => {
      this.router.navigateByUrl('/home').then(()=>window.location.reload());
    }

    return this.clienteService.createCliente(cliente).subscribe(
      () => {
        // @ts-ignore
        this.authService.login({email: cliente.email, password: `${cliente.senha}`}, onSuccess, () => {})
      },
      (error: HttpErrorResponse) => {
        this.dialog.open(ErrorDialogModalComponent,{
          data:{
            title: "Erro ao criar usuário",
            content:`${error.error.message}`
          }
        })
      }
    )
  }

  submitEstabelecimento(estabelecimento: EstabelecimentoFormGroup) {
    const onSuccess = () => {
      this.router.navigateByUrl('/home').then(()=>window.location.reload());
    }

    return this.estabelecimentoService.createEstabelecimento(estabelecimento).subscribe(
      () => {
        // @ts-ignore
        this.authService.login({email: estabelecimento.email, password: `${estabelecimento.senha}`}, onSuccess, () => {})
      },
      (error: HttpErrorResponse) => {
        this.dialog.open(ErrorDialogModalComponent,{
          data:{
            title: "Erro ao criar usuário",
            content:`${error.error.message}`
          }
        })
      }
    )
  }

  toggleCliente() {
    this.enableClienteField = true;
    this.enableEstabelecimentoField = false;
  }

  toggleEstabelecimento() {
    this.enableClienteField = false;
    this.enableEstabelecimentoField = true;
  }
}
