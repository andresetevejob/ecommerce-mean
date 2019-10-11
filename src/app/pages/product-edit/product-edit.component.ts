import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from 'src/app/models/productInfo';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit,AfterContentChecked {

  product = new ProductInfo();
  productId:string;
  isEdit=false;

  constructor(private productService: ProductService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.data.subscribe( 
      (data: {productInfo:ProductInfo})=>this.product = data.productInfo)
    this.isEdit = true;
  }

  
  ngAfterContentChecked(): void {
    throw new Error("Method not implemented.");
  }

  onSubmit(){
    if(this.productId){
      this.update()
    }else{
      this.add();
    }
  }

  add(){
    this.productService.create(this.product).subscribe(prod => {
      if (!prod) throw new Error();
      this.router.navigate(['/']);
     },
      e => {
    });
  }

  update(){
     this.productService.update(this.product).subscribe(
       prod=>{
          if(!prod){
            throw new Error();
          }
          this.router.navigateByUrl('/seller');
       },
       err=>{

       }
     );
  }

  

}
