import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";

export class EstabelecimentoFormGroup {

  static model = {
    nome: ['', Validators.required],
    cnpj: ['', Validators.compose([Validators.required, this.validateCNPJ()])],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.compose([Validators.required, this.validatePassword()])],
    confirm_senha: ['', Validators.required],
    logradouro: '',
    bairro: '',
    cidade: ''
  }

  /*
    A senha deve ter um mínimo de oito caracteres.
    Precisa ter pelo menos uma letra minúscula.
    Precisa ter pelo menos uma letra maiúscula.
    Precisa ter pelo menos um número.
  */
  static validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }

      const regex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$`);

      const valid = regex.test(control.value);

      return valid ? {} : {invalidPassword: true};
    };
  }

  /*
  Aceitar qualquer sequência de 11 números;
  */
  static validateCNPJ() {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }

      if (control.value.length != 13) {
        return {invalid: true};
      }

      const regex = new RegExp(`([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})`);

      const valid = regex.test(control.value);

      return valid ? {} : {invalid: true};
    };
  }
}
