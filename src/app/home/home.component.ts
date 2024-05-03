import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loggedInUser!: User | null
    
   constructor(private authService:LoginService)  {

      
   }

  ngOnInit(): void {
    this.authService.userSub.subscribe(user=>{
      console.log(user)
      this.loggedInUser=user
     })
   
  }

}
