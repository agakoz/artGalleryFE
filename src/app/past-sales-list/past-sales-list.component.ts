import { Component, OnInit } from '@angular/core';
import {Artwork} from "../_models/artwork.model";
import {Sale} from "../_models/sale.model";
import {SalesService} from "../_services/sales.service";
import {MatDialog} from "@angular/material/dialog";
import {WeekSales} from "../_models/week-sales.model";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {WeekSalesReportComponent} from "../week-sales-report/week-sales-report.component";
import {StubComponent} from "../stub/stub.component";

@Component({
  selector: 'app-past-sales-list',
  templateUrl: './past-sales-list.component.html',
  styleUrls: ['./past-sales-list.component.css']
})
export class PastSalesListComponent implements OnInit {
  salesList: Sale[]
  // displayedColumns: string[] = ['position', 'title', 'artistName', 'collectorName', 'customerName', 'spName', 'date', 'sellingPrice', 'more'];
  displayedColumns: string[] = ['position', 'title', 'artistName', 'customerName', 'spName', 'date', 'sellingPrice', 'more'];


  constructor(private saleService: SalesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPastSales()
  }

  private loadPastSales() {
    this.saleService.getPastSales().subscribe(
      result => {
        console.log(result)
        this.salesList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

   showThisWeekSales() {
     this.dialog.open(WeekSalesReportComponent,{
       width: '80%',
       data: {}
     });
  }

  showStubForArtist(sale:Sale) {
    this.dialog.open(StubComponent,{
      width: '80%',
      data: {saleId : sale.id}
    });
  }
}
