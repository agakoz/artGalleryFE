import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Artwork} from "../_models/artwork.model";
import {Customer} from "../_models/customer.model";
import {ArtworkService} from "../_services/artwork.service";

@Component({
  selector: 'app-customer-preference-dialog',
  templateUrl: './customer-preference-dialog.component.html',
  styleUrls: ['./customer-preference-dialog.component.scss']
})
export class CustomerPreferenceDialogComponent implements OnInit {
  artwork: Artwork;
  customers: Customer[]
  displayedColumns: string[] = ['position', 'name', 'address', 'prefType', 'prefMedium', 'prefStyle', 'prefArtist'];

  constructor(
    public dialogRef: MatDialogRef<CustomerPreferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private artworkService: ArtworkService
  ) {
  }

  ngOnInit(): void {
    this.artwork = this.data.artwork;
    this.loadCustomers()
    this.customers = this.data.customer;
  }

  private loadCustomers() {
    this.artworkService.getInterestedCustomers(this.artwork.id).subscribe(result => {
      this.customers = result
      console.log(result)
      console.log(this.customers)
    })
  }
}
