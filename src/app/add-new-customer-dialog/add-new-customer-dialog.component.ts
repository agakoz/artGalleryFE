import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../_services/artist.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {CustomerService} from "../_services/customer.service";
import {Artist} from "../_models/artist.model";

@Component({
  selector: 'app-add-new-customer-dialog',
  templateUrl: './add-new-customer-dialog.component.html',
  styleUrls: ['./add-new-customer-dialog.component.scss']
})
export class AddNewCustomerDialogComponent implements OnInit {
  newCustomerForm: FormGroup;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  artists : Artist[];
  types: string[];
  mediums: string[];
  styles: string[]
  constructor(public dialogRef: MatDialogRef<AddNewCustomerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private artistService: ArtistService) {
    dialogRef.disableClose = true;
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));

  }

  ngOnInit(): void {
    this.newCustomerForm = new FormGroup({
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      prefType: new FormControl({value: null, disabled: false}, Validators.required),
      prefMedium: new FormControl({value: null, disabled: false}, Validators.required),
      prefStyle: new FormControl({value: null, disabled: false}, Validators.required),
      prefArtist: new FormControl({value: null, disabled: false}, Validators.required),
    });
    this.loadArtists()

  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  onSubmit() {
    this.customerService.checkCustomerAddressExist(0, this.newCustomerForm.get('name')!.value, this.newCustomerForm.get('surname')!.value, this.newCustomerForm.get('address')!.value).subscribe(
      customerAlreadyExist => {
        if (customerAlreadyExist) {
          this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "This customer is already in the data base"}
          });
        } else {
          this.customerService.addCustomer(this.newCustomerForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }

  private loadArtists() {
    this.artistService.getArtistsBasicInfo().subscribe(
      result => {
        this.artists = result;
      }
    )
  }
}
