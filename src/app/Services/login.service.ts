import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomErrorResponse, JwtClaims, LoginResponse, User } from '../models/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userSub = new BehaviorSubject<User | null>(null)//it is used in navbar for conditional nav-tabs
  error= new BehaviorSubject<CustomErrorResponse | null>(null)//To set error 
  spinner = new BehaviorSubject<boolean>(false)

url="https://localhost:7202/api/User/";
  constructor(private http:HttpClient,private router: Router) { }

   
  login(username:string,password:string):Observable<LoginResponse>{
    
    const UserLoginDto = {
      Email: username,
      Password: password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>(this.url+"login",UserLoginDto);
  }
  getAllUsers():any{
    return this.http.get(this.url);
  }
  handleError(error:CustomErrorResponse){
    
    this.error.next(error)
    this.spinner.next(false)
  }
  handleAuth(response: LoginResponse) {
    localStorage.setItem('authToken', response.data);
    const tokenDataExist = localStorage.getItem('authToken');
    let user: User
    if (tokenDataExist != null) {
      const jwthelper = new JwtHelperService();
      let decodedData: JwtClaims | null = jwthelper.decodeToken(tokenDataExist)
      if (decodedData != null) {
        // console.log(decodedData)
        user = {
          name: '',
          password: '',
          email: decodedData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          role: decodedData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          id: decodedData['UserId'],
          
        }
        this.userSub.next(user);   
       if(user.role ==='Admin'){
        this.router.navigate(['profile/',user.id])
       }else{
        this.router.navigate(['user-profile/',user.id])
       }
      }
    } 
    this.spinner.next(false)
  }
  logOut() {
    this.userSub.next(null);
    localStorage.removeItem('authToken');
    this.router.navigate(['/'])
  }

}
