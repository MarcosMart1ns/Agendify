import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldModel} from "../../model/field-model/FieldModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClienteFormGroup} from "../../model/form-model/signup/ClienteFormGroup";
import {Cliente} from "../../model/response/Cliente";

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
  @Input() formTitle: string = "Form Title";
  @Input() formFieldsModel: FieldModel[] = [];
  @Input() model = {};
  @Input() subtmitButtonText = "Concluir";
  @Output() formOutputData = new EventEmitter<ClienteFormGroup>();
  formGroup: FormGroup = new FormBuilder().group(this.model);
  @Output() outputFormGroup = new EventEmitter<FormGroup>

  onSubmit() {
    this.formOutputData.emit(this.formGroup.value)
  }

  ngOnInit(): void {
    this.formGroup = new FormBuilder().group(this.model, {
      validator: this.matchPassword('senha', 'confirm_senha')
    });

    this.outputFormGroup.emit(this.formGroup);
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {

      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    }
  }

 setValues(cliente:Cliente){
    this.formGroup.get("nome")?.patchValue(cliente.nome);
 }

}
