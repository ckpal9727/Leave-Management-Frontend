import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { LoginService } from '../Services/login.service';
import { CustomErrorResponse } from '../models/models';

@Component({
  selector: 'app-appyleave',
  templateUrl: './appyleave.component.html',
  styleUrls: ['./appyleave.component.css']
})
export class AppyleaveComponent implements OnInit {
  leaveForm!: FormGroup;
  @Output() leaveApplid= new EventEmitter();
  constructor(private fb: FormBuilder,private login:LoginService,private activate:ActivatedRoute,private employee:EmployeeService) { }
  currentUserId!:number
  ngOnInit(): void {

    this.activate.params.subscribe(x=>{
      this.currentUserId=x['id'];
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
      
      this.employee.applyLeave(
        {userId:this.currentUserId,
          endDate:this.leaveForm.value.endDate,
          startDate:this.leaveForm.value.startDate,
          leaveStatus:0,
          numberOfLeave:0,
          leaveTypeId:this.leaveForm.value.leaveType
        }).subscribe(x=>{
          
          
          this.login.spinner.next(true)
          this.login.handleError(x as CustomErrorResponse)
          this.leaveApplid.emit()
        console.log(x)
        })
      // You can send the form data to your backend API or perform other actions here
    } else {
      // Handle form validation errors
      // You may want to display error messages to the user
    }
  }


}
