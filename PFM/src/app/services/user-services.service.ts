import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private apiUrl = environment.apiUrl;
  private baseRoute = `${this.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseRoute);
  }

  getUser(userId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.get<any>(url);
  }

  createNewUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseRoute}/register`, user);
  }
  updateUser(userId: string, updatedUser: any): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.patch<any>(url, updatedUser);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.delete<any>(url);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseRoute}/login`, credentials).pipe(
      // You can handle errors and show notifications here
      catchError((error) => {
        throw error;
      })
    );
  }

  getPdf(userId: string, dateRange: any): Observable<Blob> {
    const url = `${this.baseRoute}/email/${userId}`;
    return this.http.post(url, dateRange, { responseType: 'blob' });
  }
}
