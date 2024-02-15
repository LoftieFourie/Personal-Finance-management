import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InvestmentsComponent } from './investments/investments.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { DlgEditComponent } from './dlg/dlg-edit/dlg-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DlgViewCostDetailsComponent } from './dlg/dlg-view-cost-details/dlg-view-cost-details.component';
import { DlgEditCatagoriesComponent } from './dlg/dlg-edit-catagories/dlg-edit-catagories.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnalyticsComponent,
    InvestmentsComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    DlgEditComponent,
    DlgViewCostDetailsComponent,
    DlgEditCatagoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
