import {Component, Inject, OnInit} from '@angular/core';
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../_services/customer.service";
import {Customer} from "../_models/customer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Artist} from "../_models/artist.model";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {ArtistService} from "../_services/artist.service";

@Component({
  selector: 'app-edit-artist-dialog',
  templateUrl: './edit-artist-dialog.component.html',
  styleUrls: ['./edit-artist-dialog.component.css']
})
export class EditArtistDialogComponent implements OnInit {
  editedArtist: Artist
  artistForm: FormGroup;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  types: string[];
  mediums: string[];
  styles: string[]
  constructor(public dialogRef: MatDialogRef<EditArtistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService,
              private dialog: MatDialog,
              private artistService: ArtistService) {
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));
    this.editedArtist = this.data.artist
  }

  ngOnInit(): void {
    this.artistForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}, Validators.required),
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
      usualType: new FormControl({value: null, disabled: false}, Validators.required),
      usualMedium: new FormControl({value: null, disabled: false}, Validators.required),
      usualStyle: new FormControl({value: null, disabled: false}, Validators.required),
    });

    this.setArtistData()
  }
  private setArtistData() {
    this.artistForm.get('id')?.setValue(this.editedArtist.id);
    this.artistForm.get('name')?.setValue(this.editedArtist.name);
    this.artistForm.get('surname')?.setValue(this.editedArtist.surname);
    this.artistForm.get('address')?.setValue(this.editedArtist.address);
    this.artistForm.get('phone')?.setValue(this.editedArtist.phone);
    this.artistForm.get('ssn')?.setValue(this.editedArtist.ssn);
    this.artistForm.get('usualType')?.setValue(this.editedArtist.usualType);
    this.artistForm.get('usualMedium')?.setValue(this.editedArtist.usualMedium);
    this.artistForm.get('usualStyle')?.setValue(this.editedArtist.usualStyle);
  }

  onSubmit() {
    console.log(this.artistForm.value)
    this.artistService.validateArtistSSNExist(this.artistForm.get('id')!.value, this.artistForm.get('ssn')!.value).subscribe(
      ssnValid => {
        console.log(ssnValid)
        if (!ssnValid) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "artist with this SSN is already in the artist base"}
          });
        } else {
          this.artistService.updateArtist(this.artistForm).subscribe(
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
