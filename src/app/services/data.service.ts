import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  public getWsBaseUrl() {
    return environment.apiBaseUrl
  }
  public getDataById(collectionName: any, id: any) {

    //  id = id.replace(/\//g,"%2F")
    return this.http.get(this.getWsBaseUrl() + collectionName + '/' + id);
  }


  public getData(collectionName: any) {

    //  id = id.replace(/\//g,"%2F")
    return this.http.get(this.getWsBaseUrl() + collectionName);
  }





  public loginUser(data: any) {
    return this.http.post(this.getWsBaseUrl() + 'auth/login', data);
  }

  //save the data
  public save(data: any, ctrl: any) {
    let name = ctrl.collectionName
    return this.http.post(this.getWsBaseUrl() + `${name}`, data);
  }




  //to list the datas in table
  public getdata(data: any) {
    return this.http.get(this.getWsBaseUrl() + `${data}`, data);
  }

  //to update the data
  public update(data: any, ctrl: any) {
    return this.http.put(this.getWsBaseUrl() + `${ctrl.collectionName}` + `/${ctrl.id}`, data);
  }



  public updateById(collectionname: any, id: any, data: any) {
    return this.http.put(this.getWsBaseUrl() + `${collectionname}` + `/${id}`, data);
  }



  //update by id 
  public data_update(collectionname: any, id: any, data: any) {

    return this.http.put(this.getWsBaseUrl() + `${collectionname}` + `/${id}`, data);
  }

  //ASQ User for multiselect dropdown
  public getMultipleData(name: any) {
    return this.http.get(this.getWsBaseUrl() + `${name}`);
  }

  //soft delete the data
  public disable(data: any, ctrl: any, id: any) {
    let collection_name = ctrl.collectionName
    return this.http.put(this.getWsBaseUrl() + `${collection_name}/` + "disable" + `/${id}`, data);
  }


  public getDataByFilter(collectionName: any, filter: any, c?: any) {

    return this.http.get(this.getWsBaseUrl() + collectionName + `/${filter}`);

  }


  public getDataByPath(data: any, path: string) {
    if (!path) return data; // if path is undefined or empty return data
    if (path.startsWith("'"))
      return path.replace(/'/g, "")
    var paths = path.split(".");
    for (var p in paths) {
      if (!paths[p]) continue;
      data = data[paths[p]]; // new data is subdata of data
      if (!data) return data;
    }
    return data;
  }

  public processText(exp: any, data: any) {
    if (data !== null) {
      exp = exp.replace(
        /{{(\w+)}}/g, // this is the regex to replace %variable%
        (match: any, field: any) => {
          return this.getDataByPath(data, field) || ''
        }
      );
      return exp.trim();
    }
  }
  public getFilterQuery(config: any, model_data?: any) {
    if (!config) return undefined
    var conditions: any = []
    this.makeFilterConditions(config.defaultFilter, conditions, model_data)
    this.makeFilterConditions(config.fixedFilter, conditions, model_data)
    if (conditions.length > 0)
      return [{
        clause: "$and",
        conditions: conditions
      }]
    return undefined
  }

  makeFilterConditions(filterConditions: any, conditions: any, model_data?: any) {
    if (filterConditions && filterConditions.length) {
      filterConditions.forEach((c: any) => {
        var data = c['value']
        //check whether any {{}} expression is there or not?
        if (typeof data == 'string' && data.indexOf('{{') >= 0) {
          //process {{}} express
          data = this.processText(data, model_data)
        } else if (c['type'] && c['type'] == "date") {
          // date type filter
          // data = moment().add(c['addDays'] || 0, 'day').format(c['format'] || 'yyyy-MM-DDT00:00:00.000Z')
        }
        conditions.push({
          column: c['column'],
          operator: c['operator'],
          type: c['type'] || 'string',
          value: data
        })

      });
    }
  }

  buildOptions(res: any, to: any) {
    var data: any[] = res.data ? res.data : res
    if (to.labelPropTemplate) {
      data.map((e: any) => {
        e[to.labelProp] = this.processText(to.labelPropTemplate, e)
      })
    }
    data = _.sortBy(data, to.labelProp)
    if (to.optionsDataSource.firstOption) {
      data.unshift(to.optionsDataSource.firstOption)
    }
    to.options = data
  }
}
