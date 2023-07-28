import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
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

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent {
  patient = {
    id: '',
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
  successMessage: undefined | string;
  errorMessage: undefined | string;
  showSuccessMessage = true;
  showErrorMessage = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  /////////////////////////////////////////////// Exit ////////////////////////////////////////////////
  toProfile(username: string) {
    const queryParams = {
      username: username.toString()
    };
    this.router.navigate(['/profile'], { queryParams: queryParams });
  }

  myPatients() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      const n = this.username
      this.toProfile(n!);

    });
  }
  /////////////////////////////////////////////// Add ////////////////////////////////////////////////

  @ViewChild('patientForm') patientForm: NgForm | undefined;
  addPatient(): void {
    const formData = new FormData();
    formData.append('name', this.patient.name.toString());
    formData.append('patientId', this.patient.patientId.toString());
    formData.append('attendingDentist', this.patient.attendingDentist.toString());
    formData.append('age', this.patient.age.toString());
    formData.append('implant', this.patient.implant.toString());
    formData.append('numOfImplants', this.patient.numOfImplants.toString());
    formData.append('phone', this.patient.phone.toString());
    formData.append('diabetes', this.patient.diabetes.toString());
    formData.append('allergy', this.patient.allergy.toString());
    formData.append('hypertension', this.patient.hypertension.toString());
    formData.append('gender', this.patient.gender.toString());
    formData.append('feedback', this.patient.feedback.toString());
    formData.append('lastVisitDate', this.patient.lastVisitDate.toString());
    if (this.patient.image) {
      formData.append('image', this.patient.image);
    }

    this.http.post('http://127.0.0.1:8000/api/patient/', formData).subscribe(
      (response) => {
        console.log(response);
        this.showSuccessMessage = true;
        this.successMessage = '✅Patient saved successfully!';
        this.showErrorMessage = false;
        this.errorMessage = '';
        if (this.patientForm) {
          this.patientForm.reset();
          const fileInput = document.getElementById('xray') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        }
      },
      (error) => {
        console.log(error);
        this.showErrorMessage = true;
        this.errorMessage = '⛔Failed to save patient. Please try again with valid data.';
        this.showSuccessMessage = false;
        this.successMessage = '';
      });

  }

  onFileSelected(event: any): void {
    if (event.target) {
      const file: File = event.target.files[0];
      this.patient.image = file;
    }
  }

}
