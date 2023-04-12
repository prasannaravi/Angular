import { HttpClient } from '@angular/common/http';
import { Injectable, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as _ from 'lodash';
import { async } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  @ViewChild("drawer") drawer!: MatSidenav;
  authdata: any
  user_id: any
  email: any
  role_id: any

  constructor(
    private helperService: HelperService,
    private dataService: DataService,
    private dialogService: DialogService,
    private httpclient: HttpClient) {
    this.user_id = localStorage.getItem('user_id')
    this.email = localStorage.getItem('email_id')
    this.role_id = localStorage.getItem('role')
  }

  LoadInitData(ctrl: any) {
    this.httpclient.get("assets/jsons/" + ctrl.formName + "-" + "form.json").subscribe(async (config: any) => {
      ctrl.config = config
      ctrl.pageHeading = config.pageHeading
      ctrl.collectionName = config.form.collectionName
      // ctrl.model = config.model ? config.model : {};
      ctrl.mode = config.addEditMode ? config.addEditMode : 'popup'
      ctrl.model["roleId"] = this.helperService.getRole()
      if (ctrl.config.bind == true) {
        ctrl.model.trigger_user_id = this.user_id
        ctrl.model.trigger_user_email = this.email

      }
      ctrl.id = ctrl.model[config.keyField] || ctrl.model["id"] || ctrl["id"]
      ctrl.butText = ctrl.id ? 'Update' : 'Save';   //buttons based on the id
      ctrl.formAction = ctrl.id ? 'Edit' : 'Add';


      if (ctrl.formAction != 'Add') {
        this.LoadData(ctrl).subscribe((res: any) => {
          ctrl.fields = config.form.fields
        })
      }
      else if (ctrl.formAction == 'Edit' && ctrl.mode == 'popup') {
        ctrl.model['isEdit'] = true
        ctrl.model['isshow'] = true
        ctrl.model['ishide'] = true
        ctrl.isFormDataLoaded = true
        ctrl.formAction = ctrl.config.formAction || 'Edit';
        ctrl.isEditMode = true;
      }
      ctrl.fields = config.form.fields
    })
  }



  LoadData(ctrl: any): Observable<boolean> {
    var nextValue = new Subject<boolean>()
    this.LoadFormData(ctrl).subscribe(exists => {
      nextValue.next(exists)
    })
    return nextValue.asObservable()
  }

  LoadFormData(ctrl: any): Observable<boolean> {
    var nextValue = new Subject<boolean>()
    if (ctrl.id) {
      this.dataService.getDataById(ctrl.collectionName, ctrl.id).subscribe(
        (result: any) => {
          if (result && result.data && result != null) {
            ctrl.model = result.data || {}
            //we need old data, if update without any changes
            ctrl.modelOldData = _.cloneDeep(ctrl.model)
            ctrl.model['isEdit'] = true
            ctrl.model['isshow'] = true
            ctrl.model['ishide'] = true
            ctrl.isFormDataLoaded = true
            ctrl.isDataError = false //???
            ctrl.formAction = ctrl.config.formAction || 'Edit';
            ctrl.isEditMode = true;
            nextValue.next(true)
          } else {
            ctrl.model['isEdit'] = false
            ctrl.formAction = 'Add';
            ctrl.isFormDataLoaded = false
            nextValue.next(false)
          }
        },
        error => {
          // this.masterModel = {}
          // this.isDataError = true
          //Show the error popup
          console.error('There was an error!', error);
          nextValue.next(false)
        }
      )
    } else {
      nextValue.next(false)
    }
    return nextValue.asObservable();
  }

  async saveFormData(ctrl: any): Promise<any> {
    return new Promise(async (resolve, reject) => {

      if (!ctrl.form.valid) {
        this.dialogService.openSnackBar("Error in your data or missing mandatory fields", "OK")
        console.log(ctrl.form.error());

        resolve(undefined)
        return;
      }

      var data = ctrl.form.value

      if (ctrl.formAction == 'Add') {

        ctrl.model = data
        // if (ctrl.config.bind || ctrl.config.result) {
        //   ctrl.model.org_id = this.authdata
        // }

        this.dataService.save(data, ctrl).subscribe((res: any) => {
          if (res.success === 1) {
            this.dialogService.openSnackBar("Data has been added successfully", "OK")
            resolve(res)
            return
          } else {
            alert(res.data)
          }
        })
      } else { //update
        // if (_.isEqual(ctrl.modelOldData , ctrl.model)){
        //     this.dialogService.openSnackBar("No Changes made","OK")
        //     resolve(undefined)
        // }



        this.dataService.update(data, ctrl).subscribe((res: any) => {
          res
          this.dialogService.openSnackBar("Data has been updated successfully", "OK")
          resolve(res)
          // this.dialogService.closeModal()
        })
      }

    })
  }

}

