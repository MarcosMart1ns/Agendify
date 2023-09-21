import {Component} from '@angular/core';
import {ClienteFormGroup} from "../../model/form-model/signup/ClienteFormGroup";
import {FieldModel} from "../../model/field-model/FieldModel";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {Cliente} from "../../model/response/Cliente";
import {FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../services/cliente.service";
import {ValidationUtils} from "../../util/ValidationUtils";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent {
  userDetails!: Cliente;

  profileImgUrl: string = 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';

  clienteFormGroup = {
    nome: ['', Validators.required],
    cpf: ['', Validators.compose([Validators.required, ValidationUtils.validateCPF()])],
    email: ['', [Validators.required, Validators.email]],
    logradouro: '',
    bairro: '',
    cidade: ''
  };

  clienteFormField: FieldModel[] = [
    {
      fieldName: "Nome",
      controlName: "nome",
      iconUrl: "",
      fieldType: "text",
      errorMessage: "Insira um nome válido"
    },
    {
      fieldName: "CPF",
      controlName: "cpf",
      iconUrl: "",
      fieldType: "number",
      errorMessage: "CPF inválido"
    },
    {
      fieldName: "Email",
      controlName: "email",
      iconUrl: "",
      fieldType: "email",
      errorMessage: "Insira um e-mail válido"
    },
    {
      fieldName: "Logradouro",
      controlName: "logradouro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Bairro",
      controlName: "bairro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Cidade",
      controlName: "cidade",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    }
  ]

  private form : FormGroup | any;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private clienteService: ClienteService
  ) {
    if (!this.authService.isUserLogged()) {
      this.router.navigateByUrl('/login');
    }

    this.authService.getActiveUser().subscribe(
      (response) => {
        this.setUserOnForm(<Cliente>response);
      },
      () => {
        this.authService.logoutUser();
      }
    )
  }

  saveProfile(cliente: ClienteFormGroup) {
    const clienteToSave: Cliente = this.userDetails;

    for (const clienteProp in cliente) {
      // @ts-ignore
      if (clienteToSave[clienteProp] != undefined && clienteProp != "senha") {
        // @ts-ignore
        if (cliente[clienteProp] != clienteToSave[clienteProp]) {
          // @ts-ignore
          clienteToSave[clienteProp] = cliente[clienteProp];
        }
      }

    }

    this.clienteService.updateCliente(clienteToSave, this.userDetails.id).subscribe(
      (response) => {
        this.setUserOnForm(<Cliente>response);
        window.alert("Usuário Alterado com Sucesso");
        window.location.reload();
      },
      (error:HttpErrorResponse)=>{
        window.alert("Erro ao tentar salvar os seus dados:" + error.error.message);
      }
    );
  }

  receiveForm(formGroup: FormGroup) {
    this.form = formGroup;
  }

  setUserOnForm(cliente: Cliente) {

    this.userDetails = cliente

    if (this.userDetails.urlFotoPerfil) {
      this.profileImgUrl = this.userDetails.urlFotoPerfil;
    }


      this.form.get("nome").patchValue(this.userDetails.nome);
      this.form.get("cpf").patchValue(this.userDetails.cpf);
      this.form.get("email").patchValue(this.userDetails.email);
      if (this.userDetails.endereco != null) {
        this.form.get("logradouro").patchValue(this.userDetails.endereco.logradouro);
        this.form.get("bairro").patchValue(this.userDetails.endereco.bairro);
        this.form.get("cidade").patchValue(this.userDetails.endereco.cidade);
      }

  }

}
