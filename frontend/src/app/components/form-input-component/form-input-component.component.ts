import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-form-input-component',
    templateUrl: './form-input-component.component.html',
    styleUrls: ['./form-input-component.component.css']
})
export class FormInputComponentComponent {
    @Input() inputName: string = '';
    @Input() inputIcon: string = '';
    @Input() type: string = '';

}
