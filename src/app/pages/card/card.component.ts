import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit,OnDestroy {

  title:string;
  page:any;
  private paramSub:Subscription;
  private querySub:Subscription;

  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit() { 
    this.querySub = this.route.queryParams.subscribe(()=>{
      this.update();
    })
    this.paramSub = this.route.params.subscribe(()=>{
      this.update();
    })
  }
  update(){
    if(this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProducts(currentPage, size);
    } else {
      this.getProducts();
    }
  }
  getProducts(page:number=1,size:number=3) {
    if (this.route.snapshot.url.length == 1) {
      /**
       *  var x = "32";
          var y = +x; // y: number
       */
      this.productService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.page = page;
          this.title = 'Get Whatever You Want!';
      });
    }else{
      const type = this.route.snapshot.url[1].path;
      this.productService.getCategoryInPage(+type,page,size).subscribe(categoryPage=>{
        this.title  = categoryPage.category;
        this.page = categoryPage.page;
      })
    }
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  

  

}
