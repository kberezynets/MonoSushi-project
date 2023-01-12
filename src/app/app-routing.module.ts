import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

import { AdminComponent } from './admin/admin.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { ActionInfoResolver } from './shared/services/action/action-info.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'actions', component: ActionsComponent},
  { path: 'action/:id', component: ActionInfoComponent, resolve: {
    actionInfo: ActionInfoResolver
  } },
  { path: 'product-category/:category', component: ProductComponent},
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'dostavka-ta-oplata', component: DostavkaTaOplataComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'action', component: AdminActionComponent},
    { path: 'category', component: AdminCategoryComponent},
    { path: 'product', component: AdminProductComponent},
    { path: '', pathMatch: 'full', redirectTo: 'action' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }