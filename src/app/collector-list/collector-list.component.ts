import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CollectorService} from "../_services/collector.service";
import {Collector} from "../_models/collector.model";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {NewArtworkDialogComponent} from "../new-artwork-dialog/new-artwork-dialog.component";
import {NewCollectorDialogComponent} from "../new-collector-dialog/new-collector-dialog.component";
import {CollectorOwnersDialogComponent} from "../collector-owners-dialog/collector-owners-dialog.component";
import {ApprovalDialogComponent} from "../approval-dialog/approval-dialog.component";
import {Customer} from "../_models/customer.model";
import {EditCustomerComponent} from "../edit-customer/edit-customer.component";
import {EditCollectorComponent} from "../edit-collector/edit-collector.component";

@Component({
  selector: 'app-collector-list',
  templateUrl: './collector-list.component.html',
  styleUrls: ['./collector-list.component.css']
})
export class CollectorListComponent implements OnInit {

  constructor(private collectorService: CollectorService, public dialog: MatDialog) {
  }

  collectorsList: Collector[]
  displayedColumns: string[] = ['position', 'name', 'address', 'phone', 'ssn', 'more'];

  ngOnInit(): void {
    this.loadCollectors()

  }

  loadCollectors(): void {
    this.collectorService.getAllArtists().subscribe(
      result => {
        this.collectorsList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  addCollector(collector: Collector) {
    const dialogRef = this.dialog.open(NewArtworkDialogComponent, {
      width: '50%',
      data: {collector: collector}
    })
  }

  openCollectorOwnersDialog(): void {

    this.collectorService.getCollectorOwners().subscribe(
      result => {
        // this.artistsList = result;
        if (result.length > 0) {
          const dialogRef = this.dialog.open(CollectorOwnersDialogComponent, {
            width: '80%',
            data: {artists: result}
          });
        } else {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '400px',
            data: {message: "No active artists to show"}
          });
        }

      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openAddCollectorDialog() {
    const dialogRef = this.dialog.open(NewCollectorDialogComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadCollectors();

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
      data: {message: "Are you sure you want to delete the Collector together with all artworks on sale? The person will still be visible in related past sales."}
    }).afterClosed().subscribe(response => {
      if (response.event == 'Approved') {
        this.collectorService.removeCollector(id).subscribe(value => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: "Collector deleted"}
          })
          this.loadCollectors()
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

  edit(collector: Collector) {
    const dialogRef = this.dialog.open(EditCollectorComponent, {
      width: '50%',
      data: {collector: collector}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadCollectors();
      }
    })
  }
}
