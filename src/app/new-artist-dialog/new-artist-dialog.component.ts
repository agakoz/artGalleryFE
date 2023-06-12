import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {ArtistService} from "../_services/artist.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";


@Component({
  selector: 'app-new-artist-dialog',
  templateUrl: './new-artist-dialog.component.html',
  styleUrls: ['./new-artist-dialog.component.scss']
})
export class NewArtistDialogComponent implements OnInit {
  newArtistForm: FormGroup;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  types: string[];
  mediums: string[];
  styles: string[]

  constructor(public dialogRef: MatDialogRef<NewArtistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private artistService: ArtistService,
              private dialog: MatDialog,) {
    dialogRef.disableClose = true;
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));

  }

  ngOnInit(): void {

    this.newArtistForm = new FormGroup({
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
      usualType: new FormControl({value: null, disabled: false}, Validators.required),
      usualMedium: new FormControl({value: null, disabled: false}, Validators.required),
      usualStyle: new FormControl({value: null, disabled: false}, Validators.required),
    });
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  onSubmit() {
    this.artistService.checkArtistSSNExist(this.newArtistForm.get('ssn')!.value).subscribe(
      artistAlreadyExist => {
        console.log(artistAlreadyExist);
        if (artistAlreadyExist) {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "artist with this SSN is already in the artist base"}
          });
        } else {
          this.artistService.addArtist(this.newArtistForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }
}
