import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order$:Observable<Order>;

  constructor(private orderService:OrderService,
    private route:ActivatedRoute) { }

  ngOnInit() {
       this.order$ =this.route.data.pipe(
            map((data: {page:any})=><Order>data.page.content)
         );
  }

}
