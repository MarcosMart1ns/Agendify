import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";
import {ValidationUtils} from "../../../util/ValidationUtils";

export class EstabelecimentoFormGroup {

  static model = {
    nome: ['', Validators.required],
    cnpj: ['', Validators.compose([Validators.required, ValidationUtils.validateCNPJ()])],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.compose([Validators.required, ValidationUtils.validatePassword()])],
    confirm_senha: ['', Validators.required],
    logradouro: '',
    bairro: '',
    cidade: ''
  }
}
