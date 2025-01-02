import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../Service/Login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,private loginService:LoginService) {}

  baseurl=environment.apiUrl;
  loginData={
    username:'',
    password:''
  }

  login()
  {
    console.log(this.loginData);
    
    this.loginService.Login(this.loginData).subscribe({
      next: (response) => {
        if (response.serviceStatus === 'Success') {
          const admin=response.serviceResponse;
         localStorage.setItem("username",admin.username)
         this.router.navigate(['/dashboard']);

        } else {
         alert(response.serviceResponse)
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        alert('An error occurred while logging in.');
      },
    });
    
  }


}
