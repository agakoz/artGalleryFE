import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../_models/customer.model";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {CustomerService} from "../_services/customer.service";
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {Artist} from "../_models/artist.model";
import {ArtistService} from "../_services/artist.service";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  editCustomer: Customer;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  types: string[];
  mediums: string[];
  styles: string[];
  artists: Artist[];


  constructor(public dialogRef: MatDialogRef<EditCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private artistService: ArtistService) {
    // dialogRef.disableClose = true;
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}, Validators.required),
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      prefType: new FormControl({value: null, disabled: false}, Validators.required),
      prefMedium: new FormControl({value: null, disabled: false}, Validators.required),
      prefStyle: new FormControl({value: null, disabled: false}, Validators.required),
      prefArtist: new FormControl({value: null, disabled: false},),
    });
    this.editCustomer = this.data.customer;
    console.log(this.editCustomer)
    this.loadArtists();
    this.setData();

  }

  private setData() {
    this.customerForm.get('id')?.setValue(this.editCustomer.id);
    this.customerForm.get('name')?.setValue(this.editCustomer.name);
    this.customerForm.get('surname')?.setValue(this.editCustomer.surname);
    this.customerForm.get('address')?.setValue(this.editCustomer.address);
    this.customerForm.get('phone')?.setValue(this.editCustomer.phone);
    this.customerForm.get('prefType')?.setValue(this.editCustomer.prefType);
    this.customerForm.get('prefMedium')?.setValue(this.editCustomer.prefMedium);
    this.customerForm.get('prefStyle')?.setValue(this.editCustomer.prefStyle);
    this.customerForm.get('prefArtist')?.setValue(this.editCustomer.prefArtistId);
  }

  private loadArtists() {
    this.artistService.getArtistsBasicInfo().subscribe(
      result => {
        this.artists = result;
      }
    )
  }

  onSubmit() {
    console.log("customer update form: " + this.customerForm.get('prefArtist')!.value)
    this.customerService.checkCustomerAddressExist(this.customerForm.get('id')!.value, this.customerForm.get('name')!.value, this.customerForm.get('surname')!.value, this.customerForm.get('address')!.value).subscribe(
      alreadyExists => {
        if (alreadyExists) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "Customer is already in the base"}
          });
        } else {
          this.customerService.update(this.customerForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
