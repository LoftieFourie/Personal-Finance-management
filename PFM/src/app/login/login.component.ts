import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    username: '',
    password: '',
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

  login() {
    // Call the loginUser function from your service
    this.userService.loginUser(this.loginForm).subscribe(
      (response) => {
        this.localStorageService.setUserCredentials(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error logging in user', error);
        // Handle error appropriately (e.g., show error message to the user)
      }
    );
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
