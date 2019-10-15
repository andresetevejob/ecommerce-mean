import { Injectable } from '@angular/core';
import { Resolve,ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';
import { OrderService } from '../services/order.service';

/**
 * https://makina-corpus.com/blog/metier/2018/routing-angular-optimisez-le-rendu-au-changement-de-page
 */
@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<any> {
  constructor(private orderService: OrderService,private route:ActivatedRoute) {}
  resolve(): Observable<any> {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get('page')) {
        nextPage = +this.route.snapshot.queryParamMap.get('page');
        size = +this.route.snapshot.queryParamMap.get('size');
    }
    return this.orderService.getPage(nextPage, size);
    
    
  }
}