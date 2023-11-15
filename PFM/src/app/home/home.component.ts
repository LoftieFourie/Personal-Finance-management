import { Component } from '@angular/core';

interface Cost {
  amount: number;
  category: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  newCost: Cost = { amount: 0, category: '', description: '' };
  addedCosts: Cost[] = [];

  addCost() {
    // Clone the object to avoid pushing the reference
    this.addedCosts.push({ ...this.newCost });
    // Clear the input fields after adding the cost
    this.newCost = { amount: 0, category: '', description: '' };
  }

  getTotalAmount(): number {
    return this.addedCosts.reduce((total, cost) => total + cost.amount, 0);
  }
}
