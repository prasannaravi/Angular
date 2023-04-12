import { Component } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  single!: any[];
  view: any = [1825, 200];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', 'yellow', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }

}
