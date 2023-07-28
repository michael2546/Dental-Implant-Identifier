import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  id: number | undefined;
  patientId: number | undefined;
  name: string | undefined;
  implant: string | undefined;
  attendingDentist: string | undefined;
  age: number | undefined;
  phone: string | undefined;
  numOfImplants: number | undefined;
  diabetes: string | undefined;
  allergy: string | undefined;
  hypertension: string | undefined;
  gender: string | undefined;
  feedback: string | undefined;
  lastVisitDate: string | undefined;
  image: File | undefined;

  successMessage: undefined | string;
  errorMessage: undefined | string;
  showSuccessMessage = true;
  showErrorMessage = false;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  /////////////////////////////////////////////// Start /////////////////////////////////////////////////

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.id = params['id'];
      this.patientId = params['patientId'];
      this.name = params['name'];
      this.implant = params['implant'];
      this.attendingDentist = params['attendingDentist'];
      this.age = params['age'];
      this.phone = params['phone'];
      this.numOfImplants = params['numOfImplants'];
      this.diabetes = params['diabetes'];
      this.allergy = params['allergy'];
      this.hypertension = params['hypertension'];
      this.gender = params['gender'];
      this.feedback = params['feedback'];
      this.lastVisitDate = params['lastVisitDate'];
      this.image = params['image'];
    });
  }

  /////////////////////////////////////////////// Exit ////////////////////////////////////////////////

  toProfile(username: string) {
    const queryParams = {
      username: username.toString()
    };
    this.router.navigate(['/profile'], { queryParams: queryParams });
  }
  username: string | undefined;

  myPatients() {
    this.route.queryParams.subscribe(params => {
      const n = this.username
      this.toProfile(n!);

    });
  }

  ////////////////////////////////////////////// Update //////////////////////////////////////////////

  updatePatient() {
    const formData = new FormData();
    if (this.name) {
      formData.append('name', this.name.toString());
    }
    if (this.patientId) {
      formData.append('patientId', this.patientId.toString());
    }
    if (this.attendingDentist) {
      formData.append('attendingDentist', this.attendingDentist.toString());
    }
    if (this.age) {
      formData.append('age', this.age.toString());
    }
    if (this.implant) {
      formData.append('implant', this.implant.toString());
    }
    if (this.numOfImplants) {
      formData.append('numOfImplants', this.numOfImplants.toString());
    }
    if (this.phone) {
      formData.append('phone', this.phone.toString());
    }
    if (this.diabetes) {
      formData.append('diabetes', this.diabetes.toString());
    }
    if (this.allergy) {
      formData.append('allergy', this.allergy.toString());
    }
    if (this.hypertension) {
      formData.append('hypertension', this.hypertension.toString());
    }
    if (this.gender) {
      formData.append('gender', this.gender.toString());
    }
    if (this.feedback) {
      formData.append('feedback', this.feedback.toString());
    }
    if (this.lastVisitDate) {
      formData.append('lastVisitDate', this.lastVisitDate.toString());
    }
    if (this.image) {
      formData.append('image', this.image);
    }
    const url = 'http://127.0.0.1:8000/api/patient/' + this.id + '/';

    this.http.put(url, formData).subscribe(
      (response) => {
        console.log(response);
        this.showSuccessMessage = true;
        this.successMessage = '✅Patient updated successfully!';
        this.showErrorMessage = false;
        this.errorMessage = '';
      },
      (error) => {
        console.log(error);
        this.showErrorMessage = true;
        this.errorMessage = '⛔Failed to update patient, Please try again with valid data.';
        this.showSuccessMessage = false;
        this.successMessage = '';
      }
    );
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }
}
