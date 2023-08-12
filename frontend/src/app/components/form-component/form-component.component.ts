import {Component, Input} from '@angular/core';
import {FieldModel} from "../../model/FieldModel";

@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {
    @Input()formTitle: string = "Form Titel";
    @Input()formModel: FieldModel[] | undefined;
}
