import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { SliderModule } from 'ngx-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './login/login.component';
import { BuyComponent } from './buy/buy.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AdminConsultationsComponent } from './admin/admin-consultations/admin-consultations.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ProductComponent,
    ProductDetailsComponent,
    ContactsComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    BuyComponent,
    SearchPipe,
    AdminConsultationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    SliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
