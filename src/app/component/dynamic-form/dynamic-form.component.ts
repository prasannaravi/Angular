import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormService } from 'src/app/services/form.service';
import { DatatableComponent } from '../datatable/datatable.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  form = new FormGroup({});
  pageHeading: any
  formAction = 'Add'
  butText = 'Save'
  id: any
  keyField: any
  isDataError = false
  config: any = {}
  authdata: any
  options: any = {};
  fields!: FormlyFieldConfig[]
  @Input('formName') formName: any
  @Input('mode') mode: string = "page"
  @Input('model') model: any = {}
  @Output('onClose') onClose = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
  ) {
    this.route.params.subscribe(params => {
      if (params['form'])
        this.formName = params['form'];
      if (params['id'])
        this.id = params['id']
      this.initLoad()
    })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  frmSubmit(data: any) {
    this.formService.saveFormData(this).then((result: any) => {
      if (result != undefined) {
        this.goBack(result)
      }
    })
  }

  initLoad() {
    this.formService.LoadInitData(this)
  }

  goBack(data?: any) {
    if (this.config.mode == 'page') {
      this.router.navigate([`${this.config.onCancelRoute}`]);
    } else if (this.mode == 'popup') {
      if (data) {
        this.onClose.emit(data)
      } else {
        this.onClose.emit({ action: this.formAction, data: this.model })
      }
      return
    }
  }

  resetBtn(data?: any) {
    this.model = {}
    this.formAction = this.model.id ? 'Edit' : 'Add'
    this.butText = this.model.id ? 'Update' : 'Save';
  }

}
