import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { CustomErrorResponse, GetLeaveBYIdREsponse, User } from '../models/models';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-update-leave',
  templateUrl: './update-leave.component.html',
  styleUrls: ['./update-leave.component.css']
})
export class UpdateLeaveComponent implements OnInit {
  leaveForm!: FormGroup;
  leaveId!: number;
  loggedInUser!: User | null
  constructor(private fb: FormBuilder,private router:Router,private activate:ActivatedRoute,private employee:EmployeeService,private login:LoginService) { }
  leaveData!:GetLeaveBYIdREsponse
  ngOnInit(): void {
    this.login.userSub.subscribe(user=>{
      console.log(user)
      this.loggedInUser=user
     })
    this.activate.params.subscribe(x=>{
      this.leaveId=x['id']
      this.employee.getLeaveById(x['id']).subscribe(x=>{
        this.leaveData=x
        
        const startDate = new Date(x.data.startDate);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(x.data.endDate);
        endDate.setDate(endDate.getDate() +1);

        this.leaveForm.patchValue({
          leaveType: x.data.leaveType.id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        });
        
      })
    })
    
    this.leaveForm = new FormGroup({
      leaveType: new FormControl('',Validators.required),
      startDate:new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required)
    });
    
  }
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      group.get('endDate')?.setErrors({ endDateBeforeStartDate: true });
    } else {
      group.get('endDate')?.setErrors(null);
    }
  }
  onSubmit() {
    // Handle form submission
    if (this.leaveForm.valid) {
      
      this.employee.updateLeave(this.leaveId,
        {userId:this.leaveData.data.user.id,
          endDate:this.leaveForm.value.endDate,
          startDate:this.leaveForm.value.startDate,
          leaveStatus:0,
          numberOfLeave:0,
          leaveTypeId:this.leaveForm.value.leaveType
        }).subscribe(x=>{
          this.login.spinner.next(true)
          this.login.handleError(x as CustomErrorResponse)

          this.router.navigate(['user-profile',this.loggedInUser?.id])})
      // You can send the form data to your backend API or perform other actions here
    } else {
      // Handle form validation errors
      // You may want to display error messages to the user
    }
  }
}

