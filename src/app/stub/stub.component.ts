import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../_services/customer.service";
import {ArtistService} from "../_services/artist.service";
import {SalesService} from "../_services/sales.service";
import {Stub} from "../_models/stub.model";

@Component({
  selector: 'app-stub',
  templateUrl: './stub.component.html',
  styleUrls: ['./stub.component.scss']
})
export class StubComponent implements OnInit {
  stubInfo: Stub;
  constructor(public dialogRef: MatDialogRef<StubComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private saleService: SalesService) { }

  ngOnInit(): void {
    this.saleService.getStub(this.data.saleId).subscribe(result => {
      this.stubInfo = result
    })
  }

}
