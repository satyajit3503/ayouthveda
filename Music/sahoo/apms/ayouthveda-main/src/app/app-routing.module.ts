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
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: ContentComponent }, // Default route for dashboard
      { path: 'addproduct', component: AddproductComponent },
      { path: 'insights', component: InsightsComponent }, // Corrected case
      { path: 'products', component: ProductsComponent },
      { path: 'user', component: UserComponent },
      { path: 'seller', component: SellerComponent },
      { path: 'webcontent', component: WebsiteContentComponent},
      // { path: 'billingdashboard', component: BillingDashboardComponent },
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
