import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  frmLogin!: FormGroup
  user_data: any
  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public jwtService: JwtHelperService
  ) {

  }


  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      user_id: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {
    debugger
    let user_data = this.frmLogin.value
    this.dataService.loginUser(user_data).subscribe((res: any) => {

      if (res.success === 1) {
        this.user_data = this.jwtService.decodeToken(res['data'].token)
        console.log(this.user_data)
        localStorage.setItem('token', res['data'].token);
        localStorage.setItem("user_id", this.user_data.user_id);
        localStorage.setItem("name", this.user_data.user_name);
        localStorage.setItem('role', this.user_data.role_id);
        localStorage.setItem('email_id', this.user_data.email_id);
        localStorage.setItem('org_id', this.user_data.org_id);
        // localStorage.setItem('hierarchy Level', this.user_data.hierarchy_level);
        localStorage.setItem('auth', JSON.stringify(res));
        this.router.navigate(['/home']);
      } else {
        alert(res.data)
      }

    })
  }

  forgotPassword() {

  }

}
