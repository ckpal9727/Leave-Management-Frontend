import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Store } from '@ngrx/store';
import { LoginService } from '../Services/login.service';
import { User } from '../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedInUser!: User | null
    
   constructor(private authService:LoginService)  {
      
   }

  ngOnInit(): void {
    this.authService.userSub.subscribe(user=>{
      console.log(user)
      this.loggedInUser=user
     })
   
  }
  logout(){
    this.authService.logOut()
  }

}
