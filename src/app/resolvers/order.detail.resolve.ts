import { Injectable } from '@angular/core';
import { Resolve,ActivatedRoute } from '@angular/router';
import { ProductInfo } from '../models/productInfo';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Order } from '../models/Order';

/**
 * https://makina-corpus.com/blog/metier/2018/routing-angular-optimisez-le-rendu-au-changement-de-page
 */
@Injectable({
  providedIn: 'root'
})
export class OrderDetailResolver implements Resolve<Order> {
  constructor(private orderService: OrderService,private route:ActivatedRoute) {}
  resolve(): Observable<Order> {
    return this.orderService.show(this.route.snapshot.paramMap.get('id'));
    
  }
}