import { Component, OnInit } from '@angular/core';
import { CustomErrorResponse } from './models/models';
import { Observable } from 'rxjs';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService:LoginService){}
  ngOnInit(): void {
    console.log(this.spiner)
    this.authService.error.subscribe(erro=>{
      this.customError=erro
      
    })
    this.spiner=this.authService.spinner
    // this.authService.spinner.subscribe(spinner=>{console.log(spinner)})
    
  }
  customError!:CustomErrorResponse | null
  spiner!:Observable<boolean>
  title = 'LeaveManagement';
}
