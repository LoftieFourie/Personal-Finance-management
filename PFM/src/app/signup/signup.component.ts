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

  loading = false;

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
      this.router.navigate(['/home'], { skipLocationChange: true });
    }
  }

  signup() {
    this.loading = true;
    this.userService
      .createNewUser(this.signupForm)
      .subscribe(
        (response) => {
          this.localStorageService.setUserCredentials(
            response.userWithoutPassword
          );
          this.localStorageService.setToken(response.token);
          this.router.navigate(['/home'], { skipLocationChange: true });
        },
        (error) => {
          console.error('Error registering user', error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
  goToLogin() {
    this.router.navigate(['/login'], { skipLocationChange: true });
  }
}
