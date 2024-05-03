import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeaveAssignment, LeaveListResponse, ResponseUser, ResponseUsers, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url="https://localhost:7202/api/leave/";
  constructor(private http:HttpClient,private router:Router) { }
getAllLeaves():Observable<LeaveListResponse>{
  return this.http.get<LeaveListResponse>(this.url); 
}

getMyProfile(id:number):Observable<ResponseUser>{
  return this.http.get<ResponseUser>("https://localhost:7202/api/User/"+id);
}

getAllUser():Observable<ResponseUsers>{
  return this.http.get<ResponseUsers>("https://localhost:7202/api/User/");
}

registerUser(user:User){
  return this.http.post("https://localhost:7202/api/User/",user);
}

deletUser(id:number){
  return this.http.delete("https://localhost:7202/api/User/"+id);
}

updateUser(id:number,user:User){
  return this.http.put("https://localhost:7202/api/User/"+id,user);
}

//assign leave to user
assignLeave(leaveAssign:LeaveAssignment){
  console.log(leaveAssign)
  return this.http.post("https://localhost:7202/api/AssignLeave",leaveAssign);
}

approveLeave(id:number){
  return this.http.post(this.url+"approve_leave/"+id,"");
}
rejectLeave(id:number){
  return this.http.post(this.url+"reject_leave/"+id,"");
}

}
