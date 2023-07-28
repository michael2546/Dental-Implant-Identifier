import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
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
}
