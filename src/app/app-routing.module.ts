import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminConsultationsComponent } from './admin/admin-consultations/admin-consultations.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'categories/:category', component: ProductComponent},  
  {path: 'categories/:category/:id', component: ProductDetailsComponent},  
  {path: 'contacts', component: ContactsComponent},  
  { path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard] ,children: [
    {path: '', redirectTo: 'category', pathMatch: 'full'},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'orders', component: AdminOrdersComponent},
    {path: 'products', component: AdminProductsComponent},
    {path: 'consultations', component: AdminConsultationsComponent},
  ]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
