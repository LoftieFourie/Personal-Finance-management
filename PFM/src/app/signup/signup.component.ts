import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private router: Router,
    private userService: UserServicesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    // Check if the user is already logged in
    const userCredentials = this.localStorageService.getUserCredentials();

    if (userCredentials) {
      // User is already logged in, navigate to home page
      this.router.navigate(['/home']);
    }
  }

  signup() {
    // Call the registerUser function from your service
    this.userService.createNewUser(this.signupForm).subscribe(
      (response) => {
        this.localStorageService.setUserCredentials(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error registering user', error);
        // Handle error appropriately (e.g., show error message to the user)
      }
    );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
