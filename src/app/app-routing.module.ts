import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomePageComponent} from "./welcome-page/welcome-page/welcome-page.component";
import {RouterModule, Routes} from "@angular/router";
import {ArtistsListComponent} from "./artists-list/artists-list.component";
import {OnSaleComponent} from "./on-sale/on-sale.component";
import {Collector} from "./_models/collector.model";
import {CollectorListComponent} from "./collector-list/collector-list.component";
import {CustomersListComponent} from "./customers-list/customers-list.component";
import {SalespersonListComponent} from "./salesperson-list/salesperson-list.component";
import {PastSalesListComponent} from "./past-sales-list/past-sales-list.component";

const routes: Routes = [
    {
      path: '',
      component: WelcomePageComponent
    },
  {
    path: 'artists',
    component: ArtistsListComponent
  },
  {
    path: 'worksOnSale',
    component: OnSaleComponent
  },
  {
    path: 'collectors',
    component: CollectorListComponent
  },
  {
    path: 'customers',
    component: CustomersListComponent
  },
  {
    path: 'salespersons',
    component: SalespersonListComponent
  },
  {
    path: 'pastSales',
    component: PastSalesListComponent
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
