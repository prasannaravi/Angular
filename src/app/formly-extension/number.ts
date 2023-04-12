
import { FormlyFieldInput } from '@ngx-formly/material/input';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'number',
    template: `
 
 

 <mat-form-field class="form-input" appearance="outline">
            <mat-label>{{field.props!['label']}}</mat-label>
            <input matInput type="number"  [formlyAttributes]="field"
            [formControl]="thisFormControl" pKeyFilter="num" [maxlength]=limit
            />
           
          </mat-form-field>
 
 `,
})
export class FormlyFieldNumber extends FormlyFieldInput implements OnInit {

    limit: any
    public get thisFormControl() {
        return this.formControl as FormControl;
    }
    constructor(
        private dataservice: DataService
    ) {
        super()
    }
    ngOnInit() {
        debugger
        this.limit = this.field.props.maxLength
    }




}
