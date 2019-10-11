import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/models/productInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductInOrder } from 'src/app/models/ProductInOrder';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private title:string;
  private count:number;
  productInfo:ProductInfo;


  constructor(
    private route:ActivatedRoute,
    private router : Router,
    private cartService : CartService
  ) { }

  ngOnInit() {
     this.getProduct();
     this.title = 'Detail product';
     this.count = 1;
  }

  getProduct():void{
    this.route.data.subscribe( 
       (data: {productInfo:ProductInfo})=>this.productInfo = data.productInfo)
  }

  addToCart(){
     this.cartService.addItem(
       new ProductInOrder(this.productInfo,this.count)
     ).subscribe(
       res=>{
          if(!res){
             console.log('Add to cart failed');
             throw new Error();
          }
          this.router.navigateByUrl('/cart');
       },
       _=> console.log('Add to cart failed')
     )
  }

  validateCount(){
    console.log('Validate');
    const max = this.productInfo.productStock;
    if (this.count > max) {
      this.count = max;
    } else if (this.count < 1) {
      this.count = 1;
    }
  }

}
