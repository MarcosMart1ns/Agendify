import {Component, OnInit} from '@angular/core';
import {ClienteFormGroup} from "../../model/form-model/signup/ClienteFormGroup";
import {FieldModel} from "../../model/field-model/FieldModel";
import {ClienteFieldControl} from "../../model/field-model/signup/ClienteFieldControl";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {Cliente} from "../../model/response/Cliente";
import {FormComponentComponent} from "../../components/form-component/form-component.component";
import {FormGroup} from "@angular/forms";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent {
  loggedUser: any;
  profileImgUrl: string = 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
  // @ts-ignore
  clienteFormGroup = ClienteFormGroup.model;
  clienteFormField: FieldModel[] = ClienteFieldControl.fields;
  private form:FormGroup | any;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private clienteService:ClienteService
  ) {
    if (!this.authService.isUserLogged()) {
      this.router.navigateByUrl('/login');
    }

    this.authService.getActiveUser().subscribe(
      (response) => {
        this.loggedUser = this.loggedUser = <Cliente>response;
        this.form.get("nome").patchValue(this.loggedUser.nome);
        this.form.get("cpf").patchValue(this.loggedUser.cpf);
        this.form.get("email").patchValue(this.loggedUser.email);
        this.form.get("logradouro").patchValue(this.loggedUser.logradouro);
      }
    )
  }

  saveProfile(cliente: ClienteFormGroup) {
    console.log(cliente);
    this.clienteService.updateCliente(cliente, this.loggedUser.id).subscribe(
      (response)=>{
        this.loggedUser = this.loggedUser = <Cliente>response;
        this.form.get("nome").patchValue(this.loggedUser.nome);
        this.form.get("cpf").patchValue(this.loggedUser.cpf);
        this.form.get("email").patchValue(this.loggedUser.email);
        this.form.get("logradouro").patchValue(this.loggedUser.logradouro);
        window.alert("Usuário Alterado com Sucesso");
        window.location.reload();
      }
    );
  }

  receiveForm(formGroup: FormGroup) {
    this.form = formGroup;
  }
}
