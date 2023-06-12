import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Salesperson} from "../_models/salesperson.model";
import {SalesService} from "../_services/sales.service";
import {SalespersonService} from "../_services/salesperson.service";
import {Artwork} from "../_models/artwork.model";

@Component({
  selector: 'app-salesperson-report',
  templateUrl: './salesperson-report.component.html',
  styleUrls: ['./salesperson-report.component.css']
})
export class SalespersonReportComponent implements OnInit {
  begin: Date;
  end: Date
  salesperson: Salesperson
  salesAmt : number
  artworks: Artwork[]
  displayedColumns: string[] = ['title', 'artistName', 'artistSurname', 'askingPrice', 'sellingPrice'];


  constructor(
    dialogRef: MatDialogRef<SalespersonReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salespersonService: SalespersonService
  ) {
  }

  ngOnInit(): void {
    this.begin = this.data.begin
    this.end = this.data.end
    this.salesperson = this.data.salesperson
    console.log("salesperson:" + this.data.salesperson)
    console.log(this.salesperson)
    this.salesAmt = this.data.salesAmt
    if(this.salesAmt > 0) {
      this.salespersonService.getSoldArtInPeriod(this.salesperson.id, this.begin, this.end).subscribe(result => {
        this.artworks = result
        console.log(result)
      })
    }
  }

}
