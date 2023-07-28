import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
    id: number;
    patientId: string;
    name: string;
    implant: string;
    attendingDentist: string;
    age: number;
    numOfImplants: number;
    phone: number
    diabetes: string;
    allergy: string;
    hypertension: string;
    gender: string;
    feedback: string;
    lastVisitDate: string;
    image?: File;

}
