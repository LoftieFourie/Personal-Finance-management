import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CostServicesService {
  private apiUrl = environment.apiUrl;
  private baseRoute = `${this.apiUrl}/costs`;

  constructor(private http: HttpClient) {}

  getAllCosts(userId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.get<any>(url);
  }

  createNewCost(userId: string, cost: any): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.post<any>(url, cost);
  }

  getMonthCosts(userId: string, index: number): Observable<any> {
    const url = `${this.baseRoute}/month/${userId}/${index}`;
    return this.http.get<any>(url);
  }

  getCostByRange(userId: string, dateRange: any): Observable<any> {
    const url = `${this.baseRoute}/range/${userId}`;
    return this.http.post<any>(url, dateRange);
  }

  getCost(userId: string, costId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${costId}`;
    return this.http.get<any>(url);
  }

  updateCost(
    userId: string,
    costId: string,
    updatedCost: any
  ): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${costId}`;
    return this.http.patch<any>(url, updatedCost);
  }

  deleteCost(userId: string, costId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${costId}`;
    return this.http.delete<any>(url);
  }
}
