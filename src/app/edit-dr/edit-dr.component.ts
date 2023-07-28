import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-dr',
  templateUrl: './edit-dr.component.html',
  styleUrls: ['./edit-dr.component.css']
})


export class EditDrComponent implements OnInit {
  id!: number;
  username!: string;
  doctorInfo: any;
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  repassword!: string;
  successMessage: undefined | string;
  errorMessage: undefined | string;
  showSuccessMessage = true;
  showErrorMessage = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      const n = this.username
      this.getUserInfo(n!);
    });
  }
  getUserInfo(username: string) {
    return this.http.get(`http://127.0.0.1:8000/api/profile/${username}`)
      .subscribe(response => {
        this.doctorInfo = response;
        console.log(this.doctorInfo);
      });
  }

  Update(userInfo: any) {
    // const formData = new FormData();
    // if (this.username) {
    //   formData.append('username', this.username.toString());
    // }
    // if (this.email) {
    //   formData.append('email', this.email.toString());
    // }
    // if (this.first_name) {
    //   formData.append('first_name', this.first_name.toString());
    // }
    // if (this.last_name) {
    //   formData.append('last_name', this.last_name.toString());
    // }
    // if (this.password) {
    //   formData.append('password', this.password.toString());
    // }
    // if (this.id) {
    //   formData.append('id', this.id.toString());
    // }
    // if (this.repassword) {
    //   formData.append('repassword', this.repassword.toString());
    // }

    const url = 'http://127.0.0.1:8000/api/profile/' + userInfo.username + '/';

    this.http.put(url, userInfo).subscribe(
      (response) => {
        console.log(response);
        this.showSuccessMessage = true;
        this.successMessage = '✅ Data updated successfully!';
        this.showErrorMessage = false;
        this.errorMessage = '';
      },
      (error) => {
        console.log(error);
        this.showErrorMessage = true;
        this.errorMessage = '⛔ Failed to update. Please try again with valid data.';
        this.showSuccessMessage = false;
        this.successMessage = '';
      }
    );
  }


  Delete(username: any) {
    const url = 'http://127.0.0.1:8000/api/profile/' + username + '/';

    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.homeRouter();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  homeRouter() {
    this.router.navigate([''])
  }
  toProfile(username: string) {
    const queryParams = {
      username: username.toString()
    };
    this.router.navigate(['/profile'], { queryParams: queryParams });
  }

  prof() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      const n = this.username
      this.toProfile(n!);

    });
  }
}