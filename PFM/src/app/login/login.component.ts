import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationService } from '../services/notification.service';

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

  loading = false;

  constructor(
    private router: Router,
    private userService: UserServicesService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
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
    this.loading = true;
    this.userService
      .loginUser(this.loginForm)
      .subscribe(
        (response) => {
          this.localStorageService.setUserCredentials(
            response.userWithoutPassword
          );
          this.localStorageService.setToken(response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error logging in user', error);
        }
      )
      .add(() => {
        //this.notificationService.success('Login was succesful');
        this.loading = false;
      });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
