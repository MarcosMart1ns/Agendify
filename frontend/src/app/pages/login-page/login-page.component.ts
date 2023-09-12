import {Component} from '@angular/core';
import {LoginFieldControl} from "../../model/field-model/login/LoginFieldControl";
import {LoginFormGroup} from "../../model/form-model/login/LoginFormGroup";
import {FieldModel} from "../../model/field-model/FieldModel";
import {AuthorizationService} from "../../services/authorization.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Authresponse} from "../../model/response/Authresponse";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../sign-up-page/sign-up-page.component.css']
})
export class LoginPageComponent {

  fieldControl: FieldModel[] = LoginFieldControl.fields;
  formGroup = LoginFormGroup.model;

  showErrorDialog: boolean = false;
  errorMessage: string = 'Exemplo';

  constructor(
    private authorizationService: AuthorizationService
  ) {
  }

  login(user: any) {
    this.showErrorDialog = false;
    const onSuccess = (response: Authresponse) => {
      // TODO: Criar classe que representa o response
      // @ts-ignore
      window.alert(`Login efetuado com sucesso, seja bem vindo ${response.email}`)
      return response;
    }

    const onError = (error: HttpErrorResponse) => {
      this.errorMessage = `${error.error.message}`;
      this.showErrorDialog = true;
    }

    this.authorizationService.login(user, onSuccess, onError)
  }

}
