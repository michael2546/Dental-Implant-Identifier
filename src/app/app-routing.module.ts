import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UploadXrayComponent } from './upload-xray/upload-xray.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { RateUsComponent } from './rate-us/rate-us.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { SupportComponent } from './support/support.component';
import { EditDrComponent } from './edit-dr/edit-dr.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'upload-xray', component: UploadXrayComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: DoctorProfileComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'update', component: UpdatePatientComponent },
  { path: 'rate', component: RateUsComponent },
  { path: 'view-patient', component: ViewPatientComponent },
  { path: 'support', component: SupportComponent },
  { path: 'edit', component: EditDrComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
