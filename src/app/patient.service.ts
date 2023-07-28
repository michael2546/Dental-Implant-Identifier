import { Patient } from './models/patient.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = 'http://127.0.0.1:8000/api/patient/';

    constructor(private http: HttpClient) { }



    updatePatient(id: number, patient: Patient): Observable<Patient> {
        const url = `${this.apiUrl}${id}/`;
        return this.http.put<Patient>(url, patient);
    }

}

