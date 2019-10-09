import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/enum/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isInvalid : boolean;
  isLogout : boolean;
  submitted = false;
  model:any={
    username:'',
    password:'',
    remembered:false
  }
  returnUrl = '/';


  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute) { }

  onSubmit(){
    this.submitted = true;
    this.userService.login(this.model).subscribe(
      user=>{
          if(user){
            if(user.role!=Role.Customer){
               this.returnUrl = '/seller';
            }
            this.router.navigateByUrl(this.returnUrl);
          }else{
            this.isLogout = false;
            this.isInvalid = true;
          }
      }
    )
  }

  ngOnInit() {
    let params = this.route.snapshot.queryParams;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
  }

}
