
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { filter } from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'formly-field-select-dynamic-options',
  template: `

  <!-- <div class="center"><span>{{field.props!['label']}}</span></div> -->

  <mat-form-field>
  <mat-label>{{field.props!['label']}}</mat-label>
  <mat-select
  #matSelectInput
      [formlyAttributes]="field"
      [formControl]="thisFormControl"
>
  <mat-option
  *ngFor="let op of this.opt.options"
    [value]="op[this.valueProp]" (onSelectionChange)="selectionChange(op)"
  >
    {{ op[this.labelProp] }}
  </mat-option>
</mat-select>
</mat-form-field>
  `
})


export class FormlyFieldSelectDynamicOptions extends FieldType<any> implements OnInit {

  opt: any;
  data: any
  currentField: any
  //default prop setting

  //default prop setting
  valueProp = "id"
  labelProp = "name"
  dropdown: any
  selectedValue: any
  constructor(
    public dataService: DataService,
    private dialogService: DialogService,

  ) {
    super();
  }

  public get thisFormControl() {
    return this.formControl as FormControl;
  }

  ngOnInit(): void {
    debugger
    this.opt = this.field.props || {};
    this.labelProp = this.opt.labelProp;
    this.valueProp = this.opt.valueProp;
    this.currentField = this.field
    this.subscribeOnValueChangeEvent()
    if (this.opt.optionsDataSource.collectionName) {
      let name = this.opt.optionsDataSource.collectionName
      this.dataService.getdata(name).subscribe((res: any) => {
        this.dataService.buildOptions(res, this.opt);
        this.field.formControl.setValue(this.model[this.field.key])
      });
    }
  }

  //if the control has partentKey configuration, consume onValueChange event
  subscribeOnValueChangeEvent() {
    debugger
    // on ParentKey changes logic to be implemented
    if (this.field.parentKey! != "") {
      (this.field.hooks as any).afterViewInit = (f: any) => {
        const parentControl = this.form.get(this.field.parentKey)//this.opt.parent_key);
        parentControl?.valueChanges.subscribe((val: any) => {
          let selectedOption = this.model[this.field.parentKey as string]
          let parentCollectionName = this.field.parentCollectionName as string

          this.dataService.getDataByFilter(parentCollectionName, selectedOption).subscribe((res: any) => {
            // '/' + this.opt.optionsDataSource.collectionName, selectedOption
            this.dataService.buildOptions(res, this.opt);
            this.field.formControl.setValue(this.model[this.field.key])
          })
        })
      }
    }
  }

  selectionChange(selectedObject: any) {
    if (selectedObject && this.opt.onValueChangeUpdate && this.opt.onValueChangeUpdate instanceof Array) {
      for (const obj of this.opt.onValueChangeUpdate) {
        this.field.formControl.parent.controls[obj.key].setValue(
          selectedObject[obj.valueProp]
        );
      }
    }
  }
}

