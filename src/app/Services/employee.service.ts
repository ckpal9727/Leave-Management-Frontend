import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyLeave, GetLeaveBYIdREsponse, MyLeavesResponse, MySigleLeaveBalanceResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url='https://localhost:7202/api/leave/'
  constructor(private http:HttpClient,private router:Router) { }

  applyLeave(applyLeave:ApplyLeave){
    
      return this.http.post(this.url,applyLeave)
  }

  getAllMyLeave(id:number):Observable<MyLeavesResponse>{
    console.log(id)
    return this.http.get<MyLeavesResponse>(this.url+"userleaves/"+id)
  }

  cancelLeave(id:number){
    return this.http.delete(this.url+id)
  }

  getLeaveById(id:number):Observable<GetLeaveBYIdREsponse>{
    return this.http.get<GetLeaveBYIdREsponse>(this.url+id)
  }

  updateLeave(id:number,applyLeave:ApplyLeave){
    
    return this.http.put(this.url+id,applyLeave)
  }

  getSingle(userId:number,leaveTypeId:number):Observable<MySigleLeaveBalanceResponse>{
    
    return this.http.get<MySigleLeaveBalanceResponse>('https://localhost:7202/api/assignleave/getSingle/'+userId+'/'+leaveTypeId);
  }
}
