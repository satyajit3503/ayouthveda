import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CollectionsComponent } from './collections/collections.component';
import { UserComponent } from './user/user.component';
import { ProductsComponent } from './products/products.component';
import { FormGroup, FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories/categories.component';
import { TypeComponent } from './type/type.component';
import { CareRegimenComponent } from './care-regimen/care-regimen.component';
import { ConcernComponent } from './concern/concern.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { InsightsComponent } from './insights/insights.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WebsiteContentComponent } from './website-content/website-content.component';
import { SellerComponent } from './seller/seller.component';
import { LiveSearchComponent } from './live-search/live-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    LayoutComponent,
    ContentComponent,
    AddproductComponent,
    CollectionsComponent,
    UserComponent,
    ProductsComponent,
    CategoriesComponent,
    TypeComponent,
    CareRegimenComponent,
    ConcernComponent,
    IngredientsComponent,
    InsightsComponent,
    WebsiteContentComponent,
    SellerComponent,
    LiveSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    HttpClientModule,
    DragDropModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
