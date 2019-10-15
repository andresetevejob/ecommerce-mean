import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/enum/order.status';
import { Role } from 'src/app/enum/role';
import { JwtResponse } from 'src/app/response/jwt.response';
import { HttpClient } from 'selenium-webdriver/http';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  page:any;
  OrderStatus = OrderStatus;
  Role = Role;
  currentUser : JwtResponse;
  querySub:Subscription;

  constructor(
    private httpClient : HttpClient,
    private orderService : OrderService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    this.querySub = this.route.data.subscribe((data: {page:any})=>this.page = data.page)
  }

  cancelOrder(order:Order){
    this.orderService.cancel(order.orderId).subscribe(res=>{
      if(res){
        order.orderStatus = res.orderStatus;
      }
    })
  }

  finish(order:Order){
    this.orderService.finish(order.orderId).subscribe(res=>{
      if(res){
        order.orderStatus = res.orderStatus;
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.querySub.unsubscribe();
  }

}
