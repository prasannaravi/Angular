import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormlyFieldTab } from './tab';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyModule } from '@ngx-formly/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { FormlyFieldHtml } from './html';
import { FormlyFieldLabelView } from './label_view';
import { FormlyFieldMultiSelect } from './multi_select';
import { FormlyFieldSelectDynamicOptions } from './select_dynamic_options';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormlyFieldLogoUpload } from './logo_upload';
import { FormlyFieldNumber } from './number';
import { FormlyFieldDateTimePicker } from './datetimepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { FormlyFieldCustomiseInput } from './customiseinput';

const formlyConfig = {
  extras: { lazyRender: true, resetFieldOnHide: true },
  validationMessages: [
    { name: 'required', message: 'This field is required' },
  ],

  types: [
    { name: 'tabs', component: FormlyFieldTab },
    { name: 'select_dynamic_options', component: FormlyFieldSelectDynamicOptions },
    { name: 'html', component: FormlyFieldHtml },
    { name: 'multi_select', component: FormlyFieldMultiSelect },
    { name: 'label_view', component: FormlyFieldLabelView },
    { name: 'logo_upload', component: FormlyFieldLogoUpload },
    { name: 'fixednumber', component: FormlyFieldNumber },
    { name: 'datetimepicker', component: FormlyFieldDateTimePicker },
    { name: 'customise_input', component: FormlyFieldCustomiseInput }
  ]
}

@NgModule({
  declarations: [
    FormlyFieldTab,
    FormlyFieldHtml,
    FormlyFieldLabelView,
    FormlyFieldMultiSelect,
    FormlyFieldSelectDynamicOptions,
    FormlyFieldLogoUpload,
    FormlyFieldNumber,
    FormlyFieldDateTimePicker,
    FormlyFieldCustomiseInput

  ],
  imports: [

    CommonModule,
    // MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatNativeDateModule,
    AgGridModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormlyMatDatepickerModule,
    FormlyModule.forRoot(formlyConfig),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    AngularEditorModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,

  ],
  exports: [
    FormlyFieldTab,
    FormlyFieldHtml,
    FormlyFieldLabelView,
    FormlyFieldMultiSelect,
    FormlyFieldSelectDynamicOptions,
    FormlyFieldLogoUpload,
    FormlyFieldNumber,
    FormlyFieldDateTimePicker,
    FormlyFieldCustomiseInput
  ]
})
export class FormlyExtensionModule { }
