import {Usuario} from "./Usuario";
import {AbstractControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {of} from "rxjs";

export class ClienteModel implements Usuario{

  model = {
    nome: ['', Validators.required],
    cpf:  ['', [Validators.required, Validators.max(11)]],
    email:  ['', [Validators.required, Validators.email]],
    senha:  ['', Validators.compose([Validators.required, this.validatePassword()])],
    confirm_senha:  ['', Validators.required],
    logradouro:  '',
    bairro:  '',
    cidade:  ''
  }

  validatePassword() : ValidatorFn{
    return (control: AbstractControl):{ [key: string]: any }=> {
      if (!control.value) {
        return {};
      }
      /* Arsenal01234  Arsenal01239
        A senha deve ter um mínimo de oito caracteres.
        Precisa ter pelo menos uma letra minúscula.
        Precisa ter pelo menos uma letra maiúscula.
        Precisa ter pelo menos um número.
     */
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');

      const valid = regex.test(control.value);

      return valid ? {} : { invalidPassword: true };
    };
  }

}
