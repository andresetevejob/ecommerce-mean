import { Injectable } from '@angular/core';
import { Resolve,ActivatedRoute } from '@angular/router';
import { ProductInfo } from '../models/productInfo';
import { ProductService } from '../services/product.service';
import { Observable, of } from 'rxjs';

/**
 * https://makina-corpus.com/blog/metier/2018/routing-angular-optimisez-le-rendu-au-changement-de-page
 */
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsResolver implements Resolve<ProductInfo> {
  constructor(private productService: ProductService,private route:ActivatedRoute) {}
  resolve(): Observable<ProductInfo> {
    const productId : string = <string>this.route.snapshot.paramMap.get('id');
    
    if(productId){
      return this.productService.getDetail(productId);
    }
    return of(null);
    
  }
}