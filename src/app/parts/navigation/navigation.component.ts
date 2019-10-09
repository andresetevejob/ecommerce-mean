import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {JwtResponse} from "../../response/jwt.response";
import {Router} from "@angular/router";
import {Role} from "../../enum/Role";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnDestroy {

  currentSubscription : Subscription;
  name$;
  name:string;
  currentUser:JwtResponse;
  root='/';
  Role = Role;

  constructor(private userService:UserService,router:Router){}


  ngOnInit() {
    this.name$ = this.userService.name$.subscribe(aName=>this.name = aName);
    this.currentSubscription = this.userService.currentUser.subscribe(user=>{
      this.currentUser = user;
      if(!user || user.role == Role.Customer){
        this.root = '/';
      }else{
        this.root = '/seller';
      }
    })
  }

  ngOnDestroy(): void {
    this.currentSubscription.unsubscribe();
  }

  logout(){
    this.userService.logout();
  }

}
