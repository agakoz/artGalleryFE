import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArtworkService} from "../_services/artwork.service";
import {ArtistService} from "../_services/artist.service";
import {SalespersonService} from "../_services/salesperson.service";
import {CustomerService} from "../_services/customer.service";
import {Salesperson} from "../_models/salesperson.model";
import {Customer} from "../_models/customer.model";
import {SalesService} from "../_services/sales.service";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-sell-artwork-dialog',
  templateUrl: './sell-artwork-dialog.component.html',
  styleUrls: ['./sell-artwork-dialog.component.scss']
})
export class SellArtworkDialogComponent implements OnInit {
  sellArtworkForm: FormGroup;
  salespersons: Salesperson[];
  customers: Customer[];
  today: any;
  constructor(public dialogRef: MatDialogRef<SellArtworkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private salespersonService: SalespersonService,
              private customerService: CustomerService,
              private salesService : SalesService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              ) {
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  ngOnInit(): void {
    this.sellArtworkForm = new FormGroup({
      artworkId: new FormControl({value: this.data.artwork.id, disabled: false}, Validators.required),
      customerId: new FormControl({value: null, disabled: false}, Validators.required),
      salespersonId: new FormControl({value: null, disabled: false}, Validators.required),
      date: new FormControl({value: null, disabled: false}, Validators.required),
      sellingPrice: new FormControl({value: this.data.artwork.askingPrice, disabled: false}, Validators.required),
    });
    this.today = new Date();
    this.loadSalespersons();
    this.loadCustomers();
  }


  private loadCustomers() {
    this.customerService.getCustomerBasicInfo().subscribe(
      result => {
        this.customers = result;
      }
    )
  }

  private loadSalespersons() {
    this.salespersonService.getAllSalespersons().subscribe(
      result => {
        this.salespersons = result
      })
  }

  onSubmit() {
    this.sellArtworkForm.get('date')?.setValue(this.datePipe.transform(this.sellArtworkForm.get('date')?.value, 'yyyy-MM-dd'));
    this.salesService.sellArtwork(this.sellArtworkForm).subscribe(
      response => {
        this.dialogRef.close({event: 'Success'});
      }
    );
  }
}
