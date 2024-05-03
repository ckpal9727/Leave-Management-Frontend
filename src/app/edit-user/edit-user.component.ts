import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { CustomErrorResponse, User } from '../models/models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit{
  editForm!:FormGroup
  leaveAssign!:FormGroup
  cuurentUserId!:number
  loggedInUser!: User | null
  leaveTypes=[
    {id:1, name:'Casual'},
    {id:2, name:'Maternity'}, 
    {id:3, name:'Seek'}, ,
  ]
  constructor(private admin:AdminService,private router:Router,private activatedRoute:ActivatedRoute,private login:LoginService){}
  ngOnInit(): void {

    this.login.userSub.subscribe(user=>{
      console.log(user)
      this.loggedInUser=user
     })
    this.leaveAssign= new FormGroup({
      userId: new FormControl(this.cuurentUserId),
      leaveType: new FormControl(''),
      balance: new FormControl(null)
    })
    this.editForm= new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      isAdmin:new FormControl(false,[Validators.required]),
    })
  this.activatedRoute.params.subscribe(params => {
    this.cuurentUserId= params['id']
    this.admin.getMyProfile(params['id']).subscribe(x=>{
      
      this.editForm.patchValue(x.data)
    })
})

  }

  editUser(){
    
  this.admin.updateUser(this.cuurentUserId,this.editForm.value).subscribe()
  this.admin.assignLeave(
    {userId:this.cuurentUserId,leaveTypeId:this.leaveAssign.value.leaveType,NumbserOfLeave:this.leaveAssign.value.balance}
    ).subscribe((data: any) => {
      
      this.login.spinner.next(true)
      this.login.handleError(data as CustomErrorResponse)
      this.router.navigate(['profile',this.loggedInUser?.id])
      })
  }
}
