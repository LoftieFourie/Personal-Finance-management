import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestmentServicesService {
  private apiUrl = environment.apiUrl;
  private baseRoute = `${this.apiUrl}/investments`;
  constructor(private http: HttpClient) {}

  getAllInvestments(userId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.get<any>(url);
  }

  createNewInvestment(userId: string, investment: any): Observable<any> {
    const url = `${this.baseRoute}/${userId}`;
    return this.http.post<any>(url, investment);
  }

  getMonthInvestments(userId: string, index: number): Observable<any> {
    const url = `${this.baseRoute}/month/${userId}/${index}`;
    return this.http.get<any>(url);
  }

  getInvestment(userId: string, investmentId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${investmentId}`;
    return this.http.get<any>(url);
  }

  updateInvestment(
    userId: string,
    investmentId: string,
    updatedInvestment: any
  ): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${investmentId}`;
    return this.http.patch<any>(url, updatedInvestment);
  }

  deleteInvestment(userId: string, investmentId: string): Observable<any> {
    const url = `${this.baseRoute}/${userId}/${investmentId}`;
    return this.http.delete<any>(url);
  }
}
