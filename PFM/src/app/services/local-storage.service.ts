import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Cost {
  _id: string;
  user_id: string;
  amount: number;
  category?: string;
  date?: Date;
  description?: string;
}

interface UserCredentials {
  _id: string;
  username: string;
  email: string;
  password: string;
  references: {
    costs: (string | null)[];
    investments: (string | null)[];
  };
  investmentTypes: Array<{
    amount: number | null;
    category: string | null;
    description: string | null;
    added: boolean | null;
  }>;
  fixedCosts: Array<{
    amount: number | null;
    category: string | null;
    description: string | null;
    date: number | null;
    added: boolean | null;
  }>;
  categories: (string | null)[];
  token: string | null;
  colorSchema: {
    primaryColor: string | null;
    secondaryColor: string | null;
    accentColor: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private monthlyCostsSubject = new BehaviorSubject<Cost[]>([]);
  monthlyCosts$ = this.monthlyCostsSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<(string | null)[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  private userCredentialsSubject = new BehaviorSubject<UserCredentials | null>(
    null
  );
  userCredentials$ = this.userCredentialsSubject.asObservable();

  constructor() {
    // Load user credentials from localStorage on service initialization
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      this.userCredentialsSubject.next(JSON.parse(storedCredentials));
    }
  }

  getMonthlyCosts(): Cost[] {
    return this.monthlyCostsSubject.value;
  }

  setMonthlyCosts(costs: Cost[]): void {
    this.monthlyCostsSubject.next(costs);
  }

  addMonthlyCost(cost: Cost): void {
    const currentMonthlyCosts = this.getMonthlyCosts();
    const updatedMonthlyCosts = [...currentMonthlyCosts, cost];
    this.monthlyCostsSubject.next(updatedMonthlyCosts);
  }

  removeMonthlyCost(costId: string): void {
    const currentMonthlyCosts = this.getMonthlyCosts();
    const updatedMonthlyCosts = currentMonthlyCosts.filter(
      (cost) => cost._id !== costId
    );
    this.monthlyCostsSubject.next(updatedMonthlyCosts);
  }

  setUserCredentials(credentials: UserCredentials): void {
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    this.userCredentialsSubject.next(credentials);
  }

  clearUserCredentials(): void {
    localStorage.removeItem('userCredentials');
    this.userCredentialsSubject.next(null);
  }

  clearAllLocalStorage(): void {
    localStorage.clear();
    this.monthlyCostsSubject.next([]);
    this.categoriesSubject.next([]);
    this.userCredentialsSubject.next(null);
  }

  getUserCredentials(): UserCredentials | null {
    return this.userCredentialsSubject.value;
  }

  getUserId(): string | null {
    const userCredentials = this.getUserCredentials();
    return userCredentials ? userCredentials._id : null;
  }

  getCategories(): (string | null)[] {
    const userCredentials = this.getUserCredentials();
    return userCredentials ? userCredentials.categories : [];
  }

  updateCategories(newCategories: (string | null)[]): UserCredentials | null {
    this.categoriesSubject.next(newCategories);
    const userCredentials = this.getUserCredentials();

    if (userCredentials) {
      userCredentials.categories = newCategories;
      this.setUserCredentials(userCredentials);
      return userCredentials;
    }

    return null;
  }

  getFixedCosts(): (any | null)[] {
    const userCredentials = this.getUserCredentials();
    return userCredentials ? userCredentials.fixedCosts : [];
  }

  updateFixedCosts(newFixedCosts: (any | null)[]): UserCredentials | null {
    const userCredentials = this.getUserCredentials();

    if (userCredentials) {
      userCredentials.fixedCosts = newFixedCosts;
      this.setUserCredentials(userCredentials);
      return userCredentials;
    }

    return null;
  }

  getColorSchema(): {
    primaryColor: string | null;
    secondaryColor: string | null;
    accentColor: string | null;
  } {
    const userCredentials = this.getUserCredentials();
    return userCredentials
      ? userCredentials.colorSchema
      : { primaryColor: null, secondaryColor: null, accentColor: null };
  }

  updateColorSchema(newColorSchema: {
    primaryColor: string | null;
    secondaryColor: string | null;
    accentColor: string | null;
  }): UserCredentials | null {
    const userCredentials = this.getUserCredentials();

    if (userCredentials) {
      userCredentials.colorSchema = newColorSchema;
      this.setUserCredentials(userCredentials);
      return userCredentials;
    }

    return null;
  }

  setToken(token: string): void {
    const userCredentials = this.getUserCredentials();
    if (userCredentials) {
      userCredentials.token = token;
      this.setUserCredentials(userCredentials);
    }
  }

  // Get token from local storage
  getToken(): string | null {
    const userCredentials = this.getUserCredentials();
    return userCredentials ? userCredentials.token : null;
  }
}
