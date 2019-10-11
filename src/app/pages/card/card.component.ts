import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit,OnDestroy {

  title:string;
  page:any;
  
  private allParams:Subscription;

  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit() { 
    
    const params = this.route.params;
    const queryParams = this.route.queryParams;

    /**
     * source  : https://stackoverflow.com/questions/45451389/angular-combine-params-and-queryparams-observables
     * combineLatest : https://www.learnrxjs.io/operators/combination/combinelatest.html
     */
    this.allParams = combineLatest(params, queryParams, (params, qparams) => ({ params, qparams }))
      .subscribe(allParams => {
        console.log(allParams.params, allParams.qparams);
        this.update();
      });
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
       *cast string to number typeScript
       *var x = "32";
       *var y = +x; // y: number
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
    this.allParams.unsubscribe();
  }

  

  

}
