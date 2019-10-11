import {NgModule} from '@angular/core';
import {Router,Routes, RouterModule}from '@angular/router'
import {Role}from './enum/role'
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './pages/card/card.component';
import { ProductDetailsResolver } from './resolvers/product.details.resolver';
import { ProductDetailComponent } from './pages/product-detail/product-detail/product-detail.component';

const routes:Routes=[
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    { path:'login',component:LoginComponent },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
        resolve:{
            products : ProductDetailsResolver
        }
    },
    { path: 'product', component: CardComponent },
    { path: 'category', component: CardComponent },
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}