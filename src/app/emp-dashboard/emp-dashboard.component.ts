import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { MyLeavesResponse } from '../models/models';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  constructor(private router:Router,private activate:ActivatedRoute,private employee:EmployeeService) { }
  Myleave={
    casual:0,
    maternity:0,
    seek:0
  }
  myLeave=[0,0,0]
  leaveList!:MyLeavesResponse
  ngOnInit(): void {
    this.activate.params.subscribe(x=>{
    for(let i=1;i<4;i++){
      this.employee.getSingle(x['id'],i).subscribe(x=>{
        this.myLeave[i]=x.data.numbserOfLeave
        
      })
    }
      this.employee.getAllMyLeave(x['id']).subscribe(x=>{
        this.leaveList=x
        
      })
    })
   
    
  }
  CancelLeave(id:number){
    console.log(id)
    this.employee.cancelLeave(id).subscribe(x=>this.ngOnInit())
  }

  editLeave(id:number){
    this.router.navigate(['update-leave',id])
  }

  reloadPage(){
    console.log("called")
    this.ngOnInit();
  }
}
