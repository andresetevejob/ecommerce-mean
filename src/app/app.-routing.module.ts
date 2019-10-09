import {NgModule} from '@angular/core';
import {Router,Routes, RouterModule}from '@angular/router'
import {Role}from './enum/Role'
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './pages/card/card.component';

const routes:Routes=[
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    { path:'login',component:LoginComponent },
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