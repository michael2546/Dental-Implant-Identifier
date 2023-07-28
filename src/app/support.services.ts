import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Support {
    type: string;
    img: File;
}


@Injectable({
    providedIn: 'root'
})
export class SupportService {
    apiUrl = 'http://127.0.0.1:8000/support/';

    constructor(private http: HttpClient) { }

    getAllsupport(): Observable<Support[]> {
        return this.http.get<Support[]>(this.apiUrl);
    }

    addSupport(type: string, img: File): Observable<Support> {
        const csrfToken = this.getCookie('csrftoken');
        const formData = new FormData();
        formData.append('type', type);
        formData.append('img', img, img.name);
        return this.http.post<Support>(this.apiUrl, formData, { headers: { 'X-CSRFToken': csrfToken } });
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