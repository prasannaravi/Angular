import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'formly-field-label_view',
  template: `
    <div style="margin: 10px;">
    <label style=" font-weight: bold;">{{this.field.props?.label}}:</label>
    <span>{{getValue()}}</span>
    </div>
  `
})

export class FormlyFieldLabelView extends FieldType {

  constructor(

    private datePipe: DatePipe
  ) {
    super();
  }

  getValue() {
    let pipe = this.field.props?.attributes
    if (pipe) {
      return this.datePipe.transform(this.formControl.value, ("dd-MM-YYYY"))
    } else {
      return this.formControl.value

    }
  }
}
