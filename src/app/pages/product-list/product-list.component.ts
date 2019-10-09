import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/enum/role';
import { JwtResponse } from 'src/app/response/jwt.response';
import { Subscription } from 'rxjs';
import { CategoryType } from 'src/app/enum/category.type';
import { ProductInfo } from 'src/app/models/productInfo';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  

  role:Role;
  currentUser:JwtResponse;
  public products:any;
  private querySub:Subscription;
  categoryType=CategoryType;
  
  constructor(private userService:UserService,private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(()=>{
      this.update();
    })
  }
  update() {
    if(this.route.snapshot.queryParamMap.get('page')){
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProducts(currentPage,size);
    }else{
      this.getProducts();
    }
  }

  public getProducts(page:number=1,size:number=5){
     this.productService.getAllInPage(+page,+size).subscribe(products=>{
       this.products = products;
     })
  }

  public remove(productInfos:ProductInfo[],productInfo){
    this.productService.delelte(productInfo).subscribe(_=>{
      productInfos = productInfos.filter(e=>e.productId!=productInfo);
    })
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }


}
