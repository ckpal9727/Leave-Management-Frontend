import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/models';
import { AdminService } from '../Services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private admin:AdminService,private activateRoute:ActivatedRoute){}
  user!:User;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      this.admin.getMyProfile(params['id']).subscribe(x =>{
       this.user=x.data
       
      })
 
    })
  }
  

}
