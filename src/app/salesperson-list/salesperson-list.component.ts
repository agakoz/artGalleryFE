import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../_services/artist.service";
import {MatDialog} from "@angular/material/dialog";
import {SalespersonService} from "../_services/salesperson.service";
import {Artist} from "../_models/artist.model";
import {Salesperson} from "../_models/salesperson.model";
import {NewArtistDialogComponent} from "../new-artist-dialog/new-artist-dialog.component";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {NewSalespersonDialogComponent} from "../new-salesperson-dialog/new-salesperson-dialog.component";
import {ApprovalDialogComponent} from "../approval-dialog/approval-dialog.component";
import {EditArtistDialogComponent} from "../edit-artist-dialog/edit-artist-dialog.component";
import {EditSalespersonComponent} from "../edit-salesperson/edit-salesperson.component";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {SalespersonReportComponent} from "../salesperson-report/salesperson-report.component";

@Component({
  selector: 'app-salesperson-list',
  templateUrl: './salesperson-list.component.html',
  styleUrls: ['./salesperson-list.component.css']
})
export class SalespersonListComponent implements OnInit {

  constructor(private salespersonService: SalespersonService, public dialog: MatDialog) {
  }

  salespersonList: Salesperson[]
  displayedColumns: string[] = ['position', 'name', 'surname', 'ssn', 'more'];


  ngOnInit(): void {
    this.loadSalesperson()
  }
  loadSalesperson(): void {
    this.salespersonService.getAllSalespersons().subscribe(
      result => {
        this.salespersonList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openAddSalespersonDialog() {
    const dialogRef = this.dialog.open(NewSalespersonDialogComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadSalesperson();

      } else if (result.event == 'Error') {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '50%',
          data: {message: "Something went wrong. Try later."}
        })
      }
      ;
    });
  }

  delete(id: number) {
    this.dialog.open(ApprovalDialogComponent, {
      width: '600px',
      data: {message: "Are you sure you want to delete the Salesperson list? The person will still be visible on related sales."}
    }).afterClosed().subscribe(response => {
      if(response.event == 'Approved') {
        this.salespersonService.delete(id).subscribe(value => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: "Artist deleted"}
          })
          this.loadSalesperson()
        }, error => {
          console.log(error.error)
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: error.error}
          })
        })
      }
    })

  }

  edit(salesperson: Salesperson) {
    const dialogRef = this.dialog.open(EditSalespersonComponent, {
      width: '50%',
      data: {salesperson: salesperson}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadSalesperson();
      }
    })
  }

  showReportDialog(salesperson: Salesperson) {
    const dialogRef = this.dialog.open(DatePickerComponent, {
      width: '50%',
    }).afterClosed().subscribe(result => {
      if (result.event == 'Continue') {
        this.salespersonService.getSaleAmtInPeriod(salesperson.id, result.dateRange.get("beginDate").value, result.dateRange.get("endDate").value).subscribe(
          amount => {
            console.log(result)
            this.dialog.open(SalespersonReportComponent, {
              width: '50%',
              data: {
                salesperson: salesperson,
                begin: result.dateRange.get("beginDate").value,
                end: result.dateRange.get("endDate").value,
                salesAmt : amount
              }
            })
          }
        )

      }
    })
  }
}
