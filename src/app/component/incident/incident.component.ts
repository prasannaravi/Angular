import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import * as moment from "moment";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent {


  showFiller = false;
  model = {};
  listName!: string;
  activeFormName!: string;
  cols: any[] | undefined;
  listData: any;
  config: any;
  fields: any;
  tempListData: any;
  pageHeading: any;
  addEditMode: string = "popup";
  loading: boolean = false;
  pagination = true;
  columnDefs: any;
  rowData: any;
  data: any = {};
  clicked = true;
  showdefaultFilter: any = "yes";
  defaultFilter: any;
  key: any;
  phasedata: any;
  org_name: any;

  filterQuery: { clause: string; conditions: any }[] | undefined;
  filterOptions: any;
  selectedRows: any;
  frameworkComponents: any;
  authdata: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpclient: HttpClient,
    private dialogService: DialogService,
    private DataService: DataService,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit() {
    debugger;
    this.route.params.subscribe((params) => {
      if (params["form"]) {
        this.listName = params["form"];
        this.activeFormName = this.listName;
        this.phase_data();
        this.loadConfig();
        this.getList();
      }
    });
  }
  close(event: any) {
    this.router.navigate([`list/${this.config.collectionName}`]);
  }

  phase_data() {
    debugger;
    this.DataService.getDataById("organization", this.authdata).subscribe(
      (res: any) => {
        this.org_name = res.data;
      }
    );

    this.DataService.getdata("phase").subscribe((res: any) => {
      let phase_data = res.data;
      let item: any[] = [];

      //change the phase column name dynamically
      for (let i = 0; i < phase_data.length; i++) {
        let j = i + 1;
        this.key = "phase_" + j + "_label";
        let obj: any = {};
        obj[this.key] = phase_data[i].name;
        item.push(obj);
      }
      this.data = Object.assign({ org_id: this.org_name.name }, ...item);
      console.log(this.data);
    });
  }

  loadConfig() {
    this.httpclient
      .get("assets/jsons/" + this.listName + "-" + "list.json")
      .subscribe((config: any) => {
        this.config = config;
        this.filterQuery = this.DataService.getFilterQuery(config, this);
        this.filterOptions = config.filterOptions;
        this.defaultFilter = config.defaultFilter;
        this.showdefaultFilter = config.showdefaultFilter;
        this.pageHeading = config.pageHeading;
        this.addEditMode = config.addEditMode;
        this.fields = [];
        this.columnDefs = this.config.columnDefs;
        this.columnDefs.forEach((e: any) => {
          if (e.type == "date") {
            e.valueGetter = (params: any) =>
              moment(params.data[e.field]).format(e.format || "DD-MM-YYYY");
          }
        });
      });
  }
  getList() {
    this.httpclient
      .get("assets/jsons/" + this.listName + "-" + "list.json")
      .subscribe((item: any) => {
        debugger;
        let data = item || [];
        this.tempListData = [data].map((row: any) => {
          this.fields?.map((f: any) => { });
          return row;
        });

        this.listData = [...this.tempListData];
        this.loading = true;
      });


  }

}







