
import { FormlyFieldInput } from '@ngx-formly/material/input';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';
import { uniqBy } from 'lodash';


@Component({
    selector: 'customiseinput',
    template: `
 
 

 <mat-form-field class="form-input" appearance="outline">
            <mat-label>{{field.props!['label']}}</mat-label>
            <input matInput type="text"  [formlyAttributes]="field"
            [formControl]="thisFormControl" 
            required />
           
          </mat-form-field>
 
 `,
})
export class FormlyFieldCustomiseInput extends FormlyFieldInput implements OnInit {

    limit: any
    currentField: any
    opt: any;
    dataSourceUrl: any
    collectionName: any

    constructor(
        private dataservice: DataService
    ) {
        super()
    }
    public get thisFormControl() {
        return this.formControl as FormControl;
    }
    ngOnInit() {
        debugger
        this.opt = this.field.props || {};
        this.currentField = this.field

        if (this.currentField.parentKey! != "") {
            debugger
            (this.field.hooks as any).afterViewInit = (f: any) => {
                const parentControl = this.form.get(this.currentField.parentKey)//this.opt.parent_key);
                parentControl?.valueChanges.subscribe((val: any) => {
                    let selectedOption = this.model[this.currentField.parentKey as string]
                    this.dataservice.getDataById(this.currentField.collectionName, selectedOption).subscribe((res: any) => {
                        let data = res.data
                    })
                })
            }
        }
        // this.limit = this.field.props.maxLength
    }
}
