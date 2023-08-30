import {Validators} from "@angular/forms";

export class LoginFormGroup {
    static model = {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    }
}
