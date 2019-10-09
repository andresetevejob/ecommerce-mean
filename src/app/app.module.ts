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
    SignupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
