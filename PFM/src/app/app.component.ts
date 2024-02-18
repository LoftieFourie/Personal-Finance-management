import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  initialColorSchema = {
    primaryColor: '#575454',
    secondaryColor: '#b4ff28',
    accentColor: 'black',
  };
  title = 'PFM';
}
