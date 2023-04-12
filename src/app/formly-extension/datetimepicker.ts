import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment';

@Component({
  selector: 'formly-datetimepicker',
  template: `
  <mat-form-field style="width:100%">
  <input matInput [ngxMatDatetimePicker]="picker " placeholder="Choose a date"  [formControl]="FormControl"  
    [min]="minDate" [max]="today"  >
  <mat-datepicker-toggle matSuffix  [for]="$any(picker)" ></mat-datepicker-toggle>

  <ngx-mat-datetime-picker #picker [showSpinners]="showSpinners" [showSeconds]="showSeconds" [touchUi]="touchUi"
    [color]="color" [enableMeridian]="enableMeridian" [stepHour]="stepHour" [stepMinute]="stepMinute" [stepSecond]="stepSecond"></ngx-mat-datetime-picker>
</mat-form-field> 


`,
})
export class FormlyFieldDateTimePicker extends FieldType implements AfterViewInit, OnInit {

  @ViewChild('picker') picker: any;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  today = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public defaultTime = [new Date().setHours(0, 0, 0, 0)]

  ngAfterViewInit(): void {
  }


  public get FormControl() {
    return this.formControl as FormControl;
  }
  constructor(private datePipe: DatePipe) {
    super();
  }
  ngOnInit(): void {
    debugger
    let value = this.model[this.field.key as string]
    //   if (value !=null)
    //           this.field.formControl.setValue(moment(value).toDate())
    //   else
    //   this.field.formControl.setValue(moment().toDate())
    // }

  }
}