import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SalespersonService} from "../_services/salesperson.service";
import {SalesService} from "../_services/sales.service";
import {WeekSales} from "../_models/week-sales.model";

@Component({
  selector: 'app-week-sales-report',
  templateUrl: './week-sales-report.component.html',
  styleUrls: ['./week-sales-report.component.css']
})
export class WeekSalesReportComponent implements OnInit {
  sales: WeekSales[]
  // displayedColumns: string[] = ['title', 'artistName', 'artistSurname', 'collectorName', 'collectorSurname', 'customerName', 'customerSurname', 'customerAddress', 'date', 'sellingPrice'];
  displayedColumns: string[] = ['title', 'artistName', 'artistSurname', 'customerName', 'customerSurname', 'customerAddress', 'date', 'sellingPrice'];
  constructor(
    dialogRef: MatDialogRef<WeekSalesReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.loadWeekSales();
  }

  private loadWeekSales() {
    this.salesService.getThisWeekSales().subscribe(result => {
      this.sales = result
      console.log(this.sales)

    })
  }
}
