import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {WelcomePageComponent} from './welcome-page/welcome-page/welcome-page.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {NavbarComponent} from './navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {ArtistsListComponent} from './artists-list/artists-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ActiveArtistsDialogComponent} from './active-artists-dialog/active-artists-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {NewArtistDialogComponent} from './new-artist-dialog/new-artist-dialog.component';
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NewArtworkDialogComponent} from './new-artwork-dialog/new-artwork-dialog.component';
import {OnSaleComponent} from './on-sale/on-sale.component';
import {SellArtworkDialogComponent} from './sell-artwork-dialog/sell-artwork-dialog.component';
import {CollectorListComponent} from './collector-list/collector-list.component';
import {NewCollectorDialogComponent} from './new-collector-dialog/new-collector-dialog.component';
import {CollectorOwnersDialogComponent} from './collector-owners-dialog/collector-owners-dialog.component';
import {CustomersListComponent} from './customers-list/customers-list.component';
import {AddNewCustomerDialogComponent} from './add-new-customer-dialog/add-new-customer-dialog.component';
import {SalespersonListComponent} from './salesperson-list/salesperson-list.component';
import {NewSalespersonDialogComponent} from './new-salesperson-dialog/new-salesperson-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import { PastSalesListComponent } from './past-sales-list/past-sales-list.component';
import { ApprovalDialogComponent } from './approval-dialog/approval-dialog.component';
import { EditArtistDialogComponent } from './edit-artist-dialog/edit-artist-dialog.component';
import { EditSalespersonComponent } from './edit-salesperson/edit-salesperson.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditCollectorComponent } from './edit-collector/edit-collector.component';
import { ArtistArtworkReportComponent } from './artistartworkreport/artist-artwork-report.component';
import { SalespersonReportComponent } from './salesperson-report/salesperson-report.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { WeekSalesReportComponent } from './week-sales-report/week-sales-report.component';
import { CustomerPreferenceDialogComponent } from './customer-preference-dialog/customer-preference-dialog.component';
import { StubComponent } from './stub/stub.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { EditArtworkComponent } from './edit-artwork/edit-artwork.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    ArtistsListComponent,
    ActiveArtistsDialogComponent,
    InfoDialogComponent,
    NewArtistDialogComponent,
    NewArtworkDialogComponent,
    OnSaleComponent,
    SellArtworkDialogComponent,
    CollectorListComponent,
    NewCollectorDialogComponent,
    CollectorOwnersDialogComponent,
    CustomersListComponent,
    AddNewCustomerDialogComponent,
    SalespersonListComponent,
    NewSalespersonDialogComponent,
    PastSalesListComponent,
    ApprovalDialogComponent,
    EditArtistDialogComponent,
    EditSalespersonComponent,
    EditCustomerComponent,
    EditCollectorComponent,
    ArtistArtworkReportComponent,
    SalespersonReportComponent,
    DatePickerComponent,
    WeekSalesReportComponent,
    CustomerPreferenceDialogComponent,
    StubComponent,
    ImagePreviewComponent,
    EditArtworkComponent,
  ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        AppRoutingModule,
        RouterModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        HttpClientModule,
        MatTableModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaterialFileInputModule,
        MatSortModule,
    ],
  providers: [
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
