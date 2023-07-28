import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Rating {
    id: number;
    value: number;
    feedback: string;
}

@Injectable({
    providedIn: 'root'
})
export class RatingsService {
    apiUrl = 'http://127.0.0.1:8000/ratings/';

    constructor(private http: HttpClient) { }

    getAllRatings(): Observable<Rating[]> {
        return this.http.get<Rating[]>(this.apiUrl);
    }

    addRating(value: number, feedback: string): Observable<Rating> {
        const csrfToken = this.getCookie('csrftoken');
        const body = { value, feedback };
        return this.http.post<Rating>(this.apiUrl, body, { headers: { 'X-CSRFToken': csrfToken } });
    }

    private getCookie(name: string): string {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() ?? '';
        }
        return '';
    }
}