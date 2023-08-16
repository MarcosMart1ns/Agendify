import {Usuario} from "./Usuario";
import {FormGroup, Validators} from "@angular/forms";

export class ClienteModel implements Usuario{

  model = {
    nome: ['', Validators.required],
    cpf:  ['', Validators.required /*, cpfValidationFuncition]*/],
    email:  ['', [Validators.required, Validators.email]],
    senha:  ['', Validators.required /*, senhaValidationFuncition]*/],
    logradouro:  '',
    bairro:  '',
    cidade:  ''
  }

  validadeCpf(): boolean {

    return false;
  }

  // validatePassword(password: string, confirmPassword: string) {
  //   return (formGroup: FormGroup) => {
  //     const passwordControl = formGroup.controls[password];
  //     const confirmPasswordControl = formGroup.controls[confirmPassword];
  //
  //     if (!passwordControl || !confirmPasswordControl) {
  //       return null;
  //     }
  //
  //     if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
  //       return null;
  //     }
  //
  //     if (passwordControl.value !== confirmPasswordControl.value) {
  //       confirmPasswordControl.setErrors({ passwordMismatch: true });
  //     } else {
  //       confirmPasswordControl.setErrors(null);
  //     }
  //   }
  // }

}
