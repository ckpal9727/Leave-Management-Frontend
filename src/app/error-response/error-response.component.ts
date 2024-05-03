import { Component, Input, Output } from '@angular/core';


import { LoginService } from '../Services/login.service';
import { CustomErrorResponse } from '../models/models';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.css']
})
export class ErrorResponseComponent {
  @Input() errorResponse: CustomErrorResponse | null = null;

  constructor(private authService:LoginService){}
  onSetErrorNull(){
    this.authService.error.next(null);
  }
  
}
