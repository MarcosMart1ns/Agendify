import {Validators} from "@angular/forms";

import {ValidationUtils} from "../../../util/ValidationUtils";

export class ClienteFormGroup {

  static model = {
    nome: ['', Validators.required],
    cpf: ['', Validators.compose([Validators.required, ValidationUtils.validateCPF()])],
    email: ['', [Validators.required, Validators.email]],
    senha: [undefined, Validators.compose([ValidationUtils.validatePassword()])],
    confirm_senha: [undefined],
    logradouro: '',
    bairro: '',
    cidade: ''
  }

}
