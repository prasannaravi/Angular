import { Component, ViewChild, OnInit } from '@angular/core';
import { NavItem } from '../nav-items';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  @ViewChild('childMenu') public childMenu: any;
  navItems!: NavItem[]
  logo = environment.logoUrl
  menu_type: any
  user_name: any
  user_data: any
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }


  ngOnInit() {
    this.user_name = localStorage.getItem("name")
    this.user_data = localStorage.getItem("role")

    //to show the menu based on the role
    if (this.user_data == "super_admin") {
      this.menu_type = "super-admin"
    } else if (this.user_data == "SM" || this.user_data == "SU") {
      this.menu_type = "site-admin"
    }
    else if (this.user_data == "BM" || this.user_data == "BU") {
      this.menu_type = "business-admin"
    } else if (this.user_data == "OA") {
      this.menu_type = "org-admin"
    }

    this.httpClient.get("assets/menu-json/" + this.menu_type + ".json").subscribe((data: any) => {
      console.log(data);
      this.navItems = data;
    })
  }
  logout(event: any) {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  homepage(event: any) {
    this.router.navigate(['/home']);
  }

}
