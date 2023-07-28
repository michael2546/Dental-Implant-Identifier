import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  username: string | undefined;
  password: undefined | string;
  successMessage: undefined | string;
  errorMessage: undefined | string;
  showSuccessMessage = true;
  showErrorMessage = false;
  firstName: string | undefined;
  lastName: string | undefined;
  public log = false;
  public apiUrl = 'http://127.0.0.1:8000/api/register/';
  successMessage2: undefined | string;
  errorMessage2: undefined | string;
  showSuccessMessage2 = true;
  showErrorMessage2 = false;

  constructor(private http: HttpClient, private router: Router, public authService: AuthService) {
    // console.log('AuthService:', authService);
  }

  ////////////////////////////////////////////// Routes //////////////////////////////////////////////

  homeRouter() {
    this.router.navigate([''])
  }

  ////////////////////////////////////////////// Sign In //////////////////////////////////////////////
  onSubmit() {
    const payload = {
      username: this.username,
      password: this.password
    };
    this.http.post('http://127.0.0.1:8000/api/login/', payload).subscribe(
      (response: any) => {
        console.log(response);
        this.log = true;
        this.toProfile;

      },
      (error: any) => {
        console.log(error);
        this.showErrorMessage = true;
        this.errorMessage = 'Invalid username or password !';
        this.showSuccessMessage = false;
        this.successMessage = '';
      }
    );
  }

  clearForm() {
    (document.getElementById('username') as HTMLInputElement).value = '';
    (document.getElementById('password') as HTMLInputElement).value = '';
  }

  toProfile(username: string, pass: string) {
    const queryParams = {
      username: username.toString()
    };
    if (this.log) {
      this.router.navigate(['/profile'], { queryParams: queryParams });
    }
  }

  ////////////////////////////////////////////// Sign Up //////////////////////////////////////////////

  register() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const repassword = (document.getElementById('repassword') as HTMLInputElement).value;
    const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
    const last_name = (document.getElementById('last_name') as HTMLInputElement).value;

    const payload = { username, email, password, repassword, first_name, last_name };
    this.http.post(this.apiUrl, payload, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response) => {
        console.log(response);
        this.showSuccessMessage2 = true;
        this.successMessage2 = '◄ Your Signup successfully done now SignIn';
        this.showErrorMessage2 = false;
        this.errorMessage2 = '';
        this.clearForm2();
      },
      (error) => {
        console.error(error);
        this.showErrorMessage2 = true;
        this.errorMessage2 = 'Sign up faild ! you entered invalid info, or already exist username';
        this.showSuccessMessage2 = false;
        this.successMessage2 = '';
      }
    );
  }

  clearForm2() {
    (document.getElementById('first_name') as HTMLInputElement).value = '';
    (document.getElementById('last_name') as HTMLInputElement).value = '';
    (document.getElementById('username') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('password') as HTMLInputElement).value = '';
    (document.getElementById('repassword') as HTMLInputElement).value = '';
  }



  ////////////////////////////////////////////// Style //////////////////////////////////////////////

  onSignUpButtonClick(): void {
    const container = document.querySelector('.container');
    if (container)
      container.classList.add('right-panel-active');
  }

  onSignInButtonClick(): void {
    const container = document.querySelector('.container');
    if (container)
      container.classList.remove('right-panel-active');
  }

  password2: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}