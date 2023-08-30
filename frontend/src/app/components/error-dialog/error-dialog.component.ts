import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
    @Input()showDialog: boolean = true;
    @Input() message:string = "Example Message";


    dismissDialog() {
        this.showDialog = false;
    }

}
