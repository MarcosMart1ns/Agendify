import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldModel} from "../../model/FieldModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClienteModel} from "../../model/ClienteModel";

@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit{
    @Input()formTitle: string = "Form Title";
    @Input()formFieldsModel: FieldModel[] = [];
    @Input()model = {};
    @Output() formOutputData = new EventEmitter<ClienteModel>();
    formGroup:FormGroup = new FormBuilder().group(this.model);

    onSubmit(){
        this.formOutputData.emit(this.formGroup.value)
    }

    ngOnInit(): void {
        this.formGroup = new FormBuilder().group(this.model);
    }

}
