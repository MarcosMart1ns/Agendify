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

  showErrorDialog: boolean = false;
  errorMessage: string = 'Exemplo';

  constructor(
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService,
    private authService:AuthorizationService,
    private router:Router
  ) {

    if(this.authService.isUserLogged()){
      this.router.navigateByUrl('/home');
    }

  }

  submitCliente(cliente: ClienteFormGroup) {
    return this.clienteService.createCliente(cliente).subscribe(
      response => {
        // TODO: Criar classe que representa o response
        // @ts-ignore
        window.alert(`Cadastro efetuado com sucesso, seja bem vindo ${response.nome}`)
        return response;
        //TODO: Redirecionar para a página logada
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Erro ao criar usuário: \n ${error.error.message}`;
        this.showErrorDialog = true;
      }
    )
  }

  submitEstabelecimento(estabelecimento: EstabelecimentoFormGroup) {
    return this.estabelecimentoService.createEstabelecimento(estabelecimento).subscribe(
      response => {
        // TODO: Criar classe que representa o response
        // @ts-ignore
        window.alert(`Cadastro efetuado com sucesso, seja bem vindo ${response.nome}`)
        return response;
        //TODO: Redirecionar para a página logada
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Erro ao criar usuário: \n ${error.error.message}`;
        this.showErrorDialog = true;
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
