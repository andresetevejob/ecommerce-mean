import {Injectable, Injector} from '@angular/core';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest,HttpResponse}from '@angular/common/http';
import { Observable,of}from 'rxjs';
import { products }from '../mockData';

const urls = [
    {
        url : 'http://localhost:8080/product?page=1&size=3',
        json:{
            content:products
        }
    }
]

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor{
    
    constructor(private injector:Injector){}
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       for(const element of urls){
           console.log(req.url);
           console.log(element.url);
           //write algorithm begin with case regex
           if(req.url == element.url){
           // setTimeout(()=>{  
                return of(new HttpResponse({status:200,body:element.json}));
             // },500)
              
           }
       }
       return next.handle(req);
    }

}