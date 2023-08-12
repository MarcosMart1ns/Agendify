import {Component, Input, OnInit} from '@angular/core';
import {FieldModel} from "../../model/FieldModel";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit{
    @Input()formTitle: string = "Form Title";
    @Input()formFieldsModel: FieldModel[] = [];
    @Input()model = {};
    formGroup:FormGroup = new FormBuilder().group(this.model);

    onSubmit(){
        console.log(this.formGroup.value)
    }

    ngOnInit(): void {
        this.formGroup = new FormBuilder().group(this.model);
    }

}
