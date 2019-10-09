import { Injectable }from '@angular/core'
import { HttpClient }from '@angular/common/http';
import { Observable,of }from 'rxjs';
import { catchError }from 'rxjs/operators';
import { ProductInfo }from '../models/productInfo';
import { apiUrl }from '../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class ProductService{

    private productUrl = `${apiUrl}/product`;
    private categoryUrl = `${apiUrl}/category`;

    constructor(private httpClient:HttpClient){}

    getAllInPage(page:number,size:number):Observable<any>{
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.httpClient.get(url);
    }

    getCategoryInPage(categoryType:number,page:number,size:number):Observable<any>{
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.httpClient.get(url);
    }


    getDetail(id: String): Observable<ProductInfo> {
        const url = `${this.productUrl}/${id}`;
        return this.httpClient.get<ProductInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new ProductInfo());
            })
        );
    }

    update(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
        return this.httpClient.put<ProductInfo>(url, productInfo);
    }

    create(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/new`;
        return this.httpClient.post<ProductInfo>(url, productInfo);
    }


    delelte(productInfo: ProductInfo): Observable<any> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/delete`;
        return this.httpClient.delete(url);
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}