import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router, public authService: AuthService) {
  }

  xrayRouter() {
    this.router.navigate(['/upload-xray'])
  }
  signUpRouter() {
    this.router.navigate(['/signup'])
  }

  rateUsRouter() {
    this.router.navigate(['/rate'])
  }

  supportUsRouter() {
    this.router.navigate(['/support'])
  }
}
