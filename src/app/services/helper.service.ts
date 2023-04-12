import { Injectable, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DatePipe, PlatformLocation } from '@angular/common';

import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService implements OnInit {


  public ngOnInit() {
  }


  public isEmpty = (data: string) => {
    if (data === "") return true;
    return false;
  }

  public getFilteredValue(filterValue: any, data: any, column: any) {
    if (this.isEmpty(filterValue) || !data.length || !filterValue) {
      return data;
    } else {
      if (!column.length) {
        let d = data[0];
        column = Object.keys(d);
      }
      var arrayTemp: any = [];
      data.filter((d: any) => {
        Object.keys(d).map(key => {
          if (column.includes(key)) {
            if (d[key] != null && typeof d[key] != 'number' && typeof d[key] != 'object' && typeof d[key] != 'boolean') {
              if (d[key].toLowerCase().indexOf(filterValue) !== -1 || !filterValue) {
                if (arrayTemp.length != 0) {
                  var data = arrayTemp.filter((data: any) => data._id === d._id)

                  if (data.length == 0) {
                    arrayTemp.push(d);
                  }
                }
                else {
                  arrayTemp.push(d);
                }
              }
            }
          }
        });
      })
      return arrayTemp;
    }
  }
  public getToken() {

    return localStorage.getItem('token')
  }
  getRole() {
    return localStorage.getItem('role')
  }

}
