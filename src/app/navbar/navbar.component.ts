import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  @ViewChild('navbar') navbar!: ElementRef;


  ngOnInit() {
    window.addEventListener('scroll', this.scrollHandler);
  }
  scrollHandler = (event: any) => {
    const navbar = this.navbar.nativeElement;
    const navbarHeight = navbar.offsetHeight;

    if (window.scrollY > navbarHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }


  constructor(private router: Router) {
  }

  homeRouter() {
    this.router.navigate([''])
  }
  xrayRouter() {
    this.router.navigate(['/upload-xray'])
  }
  signInRouter() {
    this.router.navigate(['/signin'])
  }
  signUpRouter() {
    this.router.navigate(['/signup'])
  }
  supportUsRouter() {
    this.router.navigate(['/support'])
  }
}
