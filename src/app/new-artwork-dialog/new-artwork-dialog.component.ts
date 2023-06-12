import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../_services/artist.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {ArtworkService} from "../_services/artwork.service";
import {Artist} from "../_models/artist.model";
import {FileService} from "../_services/file.service";

@Component({
  selector: 'app-new-artwork-dialog',
  templateUrl: './new-artwork-dialog.component.html',
  styleUrls: ['./new-artwork-dialog.component.css']
})
export class NewArtworkDialogComponent implements OnInit {
  newArtworkForm: FormGroup;
  fileName: string;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  types: string[];
  mediums: string[];
  styles: string[];
  artists: Artist[] = [];

  constructor(public dialogRef: MatDialogRef<NewArtworkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private artworkService: ArtworkService,
              private artistService: ArtistService,
              private dialog: MatDialog,
              private fileService: FileService) {
    dialogRef.disableClose = true;
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.newArtworkForm = new FormGroup({
      title: new FormControl({value: null, disabled: false}, Validators.required),
      size: new FormControl({value: null, disabled: false}, Validators.required),
      artType: new FormControl({value: null, disabled: false}, Validators.required),
      artMedium: new FormControl({value: null, disabled: false}, Validators.required),
      artStyle: new FormControl({value: null, disabled: false}, Validators.required),
      askingPrice: new FormControl({value: null, disabled: false}, Validators.required),
      artistId: new FormControl({value: this.data.artist? this.data.artist.id : null, disabled: this.data.artist}, Validators.required),
      collectorId: new FormControl({value: null, disabled: false}),
      fileId: new FormControl({value: 0, disabled: false}, Validators.required),
    });

    if(!this.data.artist) {
      this.loadArtists()
      this.loadCollectors()
    } else {
      this.artists.push(this.data.artist)
      this.newArtworkForm.get('artistId')!.setValue(this.data.artist.id)
    }
    console.log(this.artists)
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  onSubmit() {
    this.artworkService.checkArtistTitleExist(this.newArtworkForm.get('artistId')!.value, this.newArtworkForm.get('title')!.value).subscribe(
      titleAlreadyExist => {
        console.log(titleAlreadyExist);
        if (titleAlreadyExist) {
          this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "artist already owns an artwork with this title"}
          });
        } else {
          this.artworkService.addArtwork(this.newArtworkForm).subscribe(
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

  private loadCollectors() {
  }


  selectFile($event: Event) {
    const target = event?.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileService.addFile(files[0]).subscribe(data => {
      this.newArtworkForm.get('fileId')!.setValue(data)
      this.fileName = files[0].name

    });
  }

  deleteFile() {
    this.newArtworkForm.get('fileId')!.setValue(null)
    this.fileName = ""
  }
}
