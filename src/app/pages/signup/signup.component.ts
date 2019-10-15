import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User;

  constructor(private location:Location,
    private userService:UserService,
    private router:Router) { 
      this.user = new User();
    }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.signUp(this.user).subscribe(u=>{
      this.router.navigate(['/login']);
    },e=>{});
  }

}
