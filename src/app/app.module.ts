import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './parts/navigation/navigation.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './pages/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AppRoutingModule } from './app.-routing.module';
import {FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpClientModule } from '@angular/common/http'; 
import {CookieService} from "ngx-cookie-service";
import { environment } from '../environments/environment';
import { HttpMockRequestInterceptor } from './interceptors/http.mock.request.interceptor';
import { ProductDetailComponent } from './pages/product-detail/product-detail/product-detail.component';
export const isMock = environment.mock;
console.log(isMock);
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PaginationComponent,
    LoginComponent,
    CardComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    UserEditComponent,
    SignupComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptor : JwtInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
