
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { values } from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
@Component({
  selector: 'formly-field-multiselect',
  template: `
  <style>
  .border{
    border: 1px solid rgb(158,158,158) !important;
    margin-bottom: 37px;
    border-radius: 4px;
    height: 50px;
    text-align: center;
  }
  </style>
  <mat-label>{{field.props!['label']}}</mat-label>
  <div class="border">
    <ng-multiselect-dropdown 
    [formControl]="FormControl"     
      [settings]="dropdownSettings"
      [data]="dropdownList"
      [formlyAttributes]="field"
     
  >
  </ng-multiselect-dropdown>
  </div> 
  `,

})


export class FormlyFieldMultiSelect extends FieldType implements OnInit {
  opt: any
  //default prop setting
  valueProp = "id"
  labelProp = "name"
  onValueChangeUpdate: any
  dropdown: any
  dropdownSettings = {}
  dropdownList = []
  label: any
  constructor(private dataService: DataService) {
    super()
  }


  public get FormControl() {
    return this.formControl as FormControl;
  }
  ngOnInit(): void {

    this.label = this.field.props?.label
    this.opt = this.field.props || {};

    this.labelProp = this.opt.labelProp
    this.valueProp = this.opt.valueProp
    this.dropdownSettings = {
      singleSelection: false,
      idField: this.valueProp,
      textField: this.labelProp,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };


    if (this.opt.optionsDataSource.collectionName) {
      debugger
      let name = this.opt.optionsDataSource.collectionName
      this.dataService.getMultipleData(name).subscribe((res: any) => {
        let data = res.data
        this.dropdownList = data
        this.dataService.buildOptions(res, this.opt);
      });
    }


  }

}