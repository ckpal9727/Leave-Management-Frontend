import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { catchError, tap } from 'rxjs';
import { CustomErrorResponse, LoginResponse } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).pipe(
      tap(()=>this.authService.spinner.next(true)),
      catchError((err )=>{
        console.log(err,"From the login component")
        this.authService.handleError(err)
        return err
      })
    ).subscribe(data=>{    
      this.authService.handleError(data as CustomErrorResponse)
        this.authService.handleAuth(data as LoginResponse)
        
    })
  }
}
