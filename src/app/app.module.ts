import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppyleaveComponent } from './appyleave/appyleave.component';
import { ListLeaveComponent } from './list-leave/list-leave.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/store.state';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UpdateLeaveComponent } from './update-leave/update-leave.component';


const route:Routes=[

{path:'my/profile/:id',component:ProfileComponent},
{path:'',component:LoginComponent},
{path:'profile/:id',component:AdminDashboardComponent},
{path:'user-profile/:id',component:EmpDashboardComponent},
{path:'edit-user/:id',component:EditUserComponent},
{path:'update-leave/:id',component:UpdateLeaveComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    EmpDashboardComponent,
    AdminDashboardComponent,
    AppyleaveComponent,
    ListLeaveComponent,
    ErrorResponseComponent,
    HomeComponent,
    ProfileComponent,
    EditUserComponent,
    UpdateLeaveComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(route),
    StoreModule.forRoot({auth: authReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
