import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { CustomErrorResponse, LeaveListResponse, ResponseUsers, User } from '../models/models';
import { Observable } from 'rxjs';
import { response } from 'express';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private login:LoginService,private admin:AdminService,private router:Router){}
deleteUser(id: string|undefined) {
  this.admin.deletUser(Number(id)).subscribe(data =>{
    
    this.login.spinner.next(true)
    this.login.handleError(data as CustomErrorResponse)
    this.ngOnInit()});
  
}
editUser(id: string) {
  this.router.navigate(['edit-user',id]);
}

  registerForm!:FormGroup
  registerUser() {
    this.admin.registerUser(this.registerForm.value).subscribe(x=>{
      
      this.login.spinner.next(true)
      this.login.handleError(x as CustomErrorResponse)
      this.ngOnInit();
    })
}

  $response!:LeaveListResponse
  $users!:ResponseUsers
  isUserView:boolean=true;
  ngOnInit(): void {
  //seting for value
  this.registerForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    isAdmin:new FormControl(false,[Validators.required]),
  })

  //end
   this.admin.getAllLeaves().subscribe(x=>{
    this.$response=x
    
   });
   this.admin.getAllUser().subscribe(u=>{
    this.$users=u
   })
   
  }

  switchManagement(){
    this.isUserView=!this.isUserView
  }

  ApproveLeave(id:number){
    this.admin.approveLeave(id).subscribe(x=>{
      
      this.login.spinner.next(true)
      this.login.handleError(x as CustomErrorResponse)
      this.ngOnInit()
    })
  }

  RejctLeave(id:number){
    this.admin.rejectLeave(id).subscribe(x=>{
      
      this.login.spinner.next(true)
      this.login.handleError(x as CustomErrorResponse)
      this.ngOnInit()
    })
  }

}
