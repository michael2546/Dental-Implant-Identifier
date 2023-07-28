import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Patient {
  id: number;
  patientId: string;
  name: string;
  implant: string;
  attendingDentist: string;
  age: number;
  phone: number;
  numOfImplants: number;
  diabetes: string;
  allergy: string;
  hypertension: string;
  gender: string;
  feedback: string;
  lastVisitDate: string;
  image: string;
}

interface search {
  phone: number;
  patientId: string;
}

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})

export class DoctorProfileComponent implements OnInit {

  patient = {
    // id:'',
    patientId: '',
    name: '',
    implant: '',
    attendingDentist: '',
    age: '',
    numOfImplants: '',
    phone: '',
    diabetes: '',
    allergy: '',
    hypertension: '',
    gender: '',
    feedback: '',
    lastVisitDate: '',
    image: undefined as File | undefined
  };
  message: string | undefined;
  patients: Patient[] = [];
  selectedPatient: Patient = {} as Patient;
  username: string | undefined;
  doctorInfo: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public authService: AuthService) {
  }
  ///////////////////////////////////////////// Routes ////////////////////////////////////////////////

  patientRoute() {
    this.router.navigate(['/patients'])
  }
  homeRouter() {
    this.router.navigate([''])
  }
  logOut() {
    this.authService.isLoggedIn = false;
    this.router.navigate([''])
  }
  viewPatientRoute(username: string, id: number, patientId: string, name: string, implant: string, attendingDentist: string, age: number, phone: number, numOfImplants: number, diabetes: string, allergy: string, hypertension: string, gender: string, feedback: string, lastVisitDate: string, image: string) {
    const queryParams = {
      username: username.toString(),
      id: id,
      name: name.toString(),
      patientId: patientId.toString(),
      implant: implant.toString(),
      attendingDentist: attendingDentist.toString(),
      age: age,
      phone: phone,
      numOfImplants: numOfImplants,
      diabetes: diabetes,
      allergy: allergy,
      hypertension: hypertension,
      gender: gender.toString(),
      feedback: feedback.toString(),
      lastVisitDate: lastVisitDate.toString(),
      image: image.toString(),
    };

    this.router.navigate(['/view-patient'], { queryParams: queryParams });
  }

  ///////////////////////////////////////////// Start ////////////////////////////////////////////////

  ngOnInit(): void {
    this.getPatients();
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

  getPatients() {
    this.http.get<Patient[]>('http://127.0.0.1:8000/api/patient/').subscribe(data => {
      this.patients = data;
    });
  }

  ///////////////////////////////////////////////// Add ////////////////////////////////////////////////
  AddPatientForm(username: string) {
    const queryParams = {
      username: username.toString()
    };
    this.router.navigate(['/add-patient'], { queryParams: queryParams });
  }

  ///////////////////////////////////////////////// Update ////////////////////////////////////////////////

  editPatient(username: string, id: number, patientId: string, name: string, implant: string, attendingDentist: string, age: number, phone: number, numOfImplants: number, diabetes: string, allergy: string, hypertension: string, gender: string, feedback: string, lastVisitDate: string, image: string) {
    const queryParams = {
      username: username.toString(),
      id: id,
      name: name.toString(),
      patientId: patientId.toString(),
      implant: implant.toString(),
      attendingDentist: attendingDentist.toString(),
      age: age,
      phone: phone,
      numOfImplants: numOfImplants,
      diabetes: diabetes,
      allergy: allergy,
      hypertension: hypertension,
      gender: gender.toString(),
      feedback: feedback.toString(),
      lastVisitDate: lastVisitDate.toString(),
      image: image.toString(),
    };
    this.router.navigate(['/update'], { queryParams: queryParams });
  }

  ///////////////////////////////////////////////// Delete ////////////////////////////////////////////////

  deletePatient(patient: Patient) {
    this.http.delete<Patient>('http://127.0.0.1:8000/api/patient/' + patient.id).subscribe(data => {
      this.getPatients();
    });
  }
  ///////////////////////////////////////////////// Change Info ////////////////////////////////////////////////
  Change(username: string) {
    const queryParams = {
      username: username.toString(),
    };
    this.router.navigate(['/edit'], { queryParams: queryParams });
  }
  /////////////////////////////////////////////// Style ////////////////////////////////////////////////

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;

  fileChanged(event: any) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const element = this.imageElement.nativeElement;
    element.src = url;
    element.onload = () => URL.revokeObjectURL(element.src);
    const uploadImgElement = document.querySelector('.upload-img') as HTMLDivElement;
    if (uploadImgElement !== null) {
      uploadImgElement.style.backgroundImage = `url(${url})`;
    }
  }

  uploadimg() {
    this.fileInput.nativeElement.click();
  }


  // //////////////////////////////////////////search////////////////////////////////////////////////////////

  searchText = '';

}
