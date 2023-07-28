import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UploadXrayComponent } from './upload-xray/upload-xray.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RateUsComponent } from './rate-us/rate-us.component';
import { SearchPipe } from './search.pipe';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { SupportComponent } from './support/support.component';
import { EditDrComponent } from './edit-dr/edit-dr.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UploadXrayComponent,
    SigninComponent,
    SignupComponent,
    DoctorProfileComponent,
    NavbarComponent,
    AddPatientComponent,
    UpdatePatientComponent,
    RateUsComponent,
    SearchPipe,
    ViewPatientComponent,
    SupportComponent,
    EditDrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
