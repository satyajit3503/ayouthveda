import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CollectionsComponent } from './collections/collections.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';
import { InsightsComponent } from './insights/insights.component';
import { SellerComponent } from './seller/seller.component';
import { WebsiteContentComponent } from './website-content/website-content.component';


const routes: Routes = [
  // Login route
  { path: 'login', component: LoginComponent },

  // Dashboard layout route with children
  {
    path: 'home',
    component: LayoutComponent, // Main layout component for "home"
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'dashboard', component: ContentComponent }, // Dashboard content
      { path: 'products', component: ProductsComponent }, // Main Products Component
      { path: 'products/addproduct', component: AddproductComponent }, // Separate route for Add Product
      { path: 'insights', component: InsightsComponent },
      { path: 'user', component: UserComponent },
      { path: 'seller', component: SellerComponent },
      { path: 'webcontent', component: WebsiteContentComponent },
    ],
  },

  // Default redirect route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard route for 404 or undefined paths
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
