import { Component, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'formly-field-html',
  template: `
    <style>
    .header {
        margin-top: 100px;
        text-align: center;
        margin-bottom: 40px;
      }
      .html-header {
        margin: 15px 0 5px;
      }

      .html {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0.5rem;
        background-color: #f1f1f1;
        min-height: 20px;
        max-height: 10rem;
        overflow: auto;
      }
      </style>
     <!-- <div style="margin-bottom: 20px;background-color: white;"> -->
    
    <span >{{field.props!['label'] || "HTML"}}</span>

     <angular-editor
        [formlyAttributes]="field"
        [config]="editorConfig" [(ngModel)]="data" (input)="showHTML($event,this.field)" ></angular-editor>
        <!-- <button _ngcontent-c2="" class="angular-editor-button" title="Subscript" type="button" id="subscript-"><i _ngcontent-c2="" class="fa fa-subscript"></i></button> -->
     <!-- </div> -->
     
  `

})
export class FormlyFieldHtml extends FieldType implements AfterViewInit {
  formcontrol!: FormControl
  data: any
  hide = [
    'undo',
    'redo',
    'strikeThrough',
    'insertImage',
    'link',
    'unlink',
    'insertVideo',
    'insertHorizontalRule',
    'customClasses',
    'toggleEditorMode',
    // 'fontName'

  ]

  ngAfterViewInit() {
    let key = this.field.key as string
    this.data = this.field.model[key]
  }

  editorConfig: any = {
    editable: true,
    spellcheck: true,
    // sanitize: false,
    height: '1rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    toolbarHiddenButtons: [this.hide],


  }

  showHTML(event: any, ctrl: any) {
    let val = this.data
    ctrl.formControl.setValue(val)
  }
}
