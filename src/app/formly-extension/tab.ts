import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tab',
  template: `
    <mat-tab-group>
      <mat-tab
        *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
        [label]="tab.props!.label || 'Tab'"


      >
        <formly-field [field]="tab"></formly-field>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTab extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      // return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}
