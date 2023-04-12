import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DatatableComponent } from './datatable.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-button-renderer',
  template: `
<style>
::ng-deep.mat-mdc-dialog-container .mdc-dialog__surface {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
}</style>
    <mat-icon  style="margin-top:9px" [matMenuTriggerFor]="menu" >more_vert</mat-icon>
    <mat-menu [overlapTrigger]="false" #menu="matMenu">
    <span *ngFor="let item of actions">
    <button mat-menu-item  (click)="onClickMenuItem(item)">
    <mat-icon >{{item.icon}}</mat-icon>{{item.label}}</button></span>
  </mat-menu>
  `
})

export class ActionButtonComponent implements ICellRendererAngularComp {
  params: any
  actions: any
  constructor(
  ) {
  }
  agInit(params: any): void {
    this.params = params;
    this.actions = this.params.context.componentParent.config.actions
  }

  onClickMenuItem(item: any) {
    this.params.context.componentParent.onActionButtonClick(item, this.params.data)
  }

  refresh(param: any): boolean {
    return true
  }

  // edit() {

  //   debugger
  //   console.log(this.data)
  //   let row = this.data
  //   this.datatable.onSelect(row, this.config)
  // }

  // view() {

  //   this.view_data = this.data
  //   // let ctrl = this.datatable.config.collectionName

  //   //   if(this.data.format=="date"){
  //   // moment(this.data).format("DD-MM-YYY")
  //   //     }
  //   this.datatable.view(this.data)

  // }


  // delete() {
  //   this.dialogService.openDialog(this.popup, "20%", "20%", {});
  // }


  // delete_button() {
  //   debugger
  //   let prefix = this.datatable.config.collectionName
  //   let config = this.datatable.config

  //   if (prefix == "division" || prefix == "site" || prefix == "category" || prefix == "customer" || prefix == "subcategory") {
  //     // prefix = prefix.slice(0, 3);
  //     prefix = prefix + "_code"
  //     let row = this.data

  //     this.row_data = {
  //       id: row[prefix],
  //       delete_flag: 1
  //     }
  //     this.id = this.row_data.id
  //   }
  //   else if (prefix == "user" || prefix == "incident_case") {
  //     // prefix = prefix.slice(0, 3);
  //     prefix = prefix + "_id"
  //     let row = this.data

  //     this.row_data = {
  //       id: row[prefix],
  //       delete_flag: 1
  //     }
  //     this.id = this.row_data.id
  //   }
  //   else {
  //     let row: any = this.data
  //     this.row_data = {
  //       id: row['id'],
  //       delete_flag: 1
  //     }
  //     this.id = this.row_data.id
  //   }
  //   this.DataService.disable(this.row_data, config, this.id).subscribe((res: any) => {
  //     this.dialogService.openSnackBar("Data has been Deleted successfully", "OK")
  //     this.cancel()
  //     this.datatable.getList()
  //   })
  // }



  // cancel() {
  //   this.dialogService.dialogRef.close()
  // }

}
