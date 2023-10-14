import {Component} from '@angular/core';
import {LoginFieldControl} from "../../model/field-model/login/LoginFieldControl";
import {LoginFormGroup} from "../../model/form-model/login/LoginFormGroup";
import {FieldModel} from "../../model/field-model/FieldModel";
import {AuthorizationService} from "../../services/authorization.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Authresponse} from "../../model/response/Authresponse";
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogModalComponent} from "../../components/error-dialog-modal/error-dialog-modal.component";

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
    private authorizationService: AuthorizationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (this.authorizationService.isUserLogged()) {
      this.router.navigateByUrl('/home');
    }
  }

  login(user: any) {
    const onSuccess = () => {
      this.router.navigateByUrl('/home').then(()=>window.location.reload());
    }

    const onError = (error: HttpErrorResponse) => {
        this.dialog.open(ErrorDialogModalComponent,{
          data:{
            title: "Erro ao tentar efetuar login",
            content:`${error.error.message}`
          }
        })
    }

    this.authorizationService.login(user, onSuccess, onError)
  }

}
