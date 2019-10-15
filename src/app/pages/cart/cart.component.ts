import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { JwtResponse } from 'src/app/response/jwt.response';
import { Subscription, Subject } from 'rxjs';
import { ProductInOrder } from 'src/app/models/ProductInOrder';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productInOrders = [];
  total = 0;
  currentUser:JwtResponse;
  userSubscription:Subscription;
  private updateTerms = new Subject<ProductInOrder>();
  sub:Subscription;
  
  constructor(
    private cartService : CartService,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
  }

}
