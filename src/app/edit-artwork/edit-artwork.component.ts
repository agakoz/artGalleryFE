import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../_services/customer.service";
import {ArtistService} from "../_services/artist.service";
import {Artist} from "../_models/artist.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtMedium, ArtStyle, ArtType} from "../enums";
import {Artwork} from "../_models/artwork.model";
import {FileService} from "../_services/file.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {ArtworkService} from "../_services/artwork.service";

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.scss']
})
export class EditArtworkComponent implements OnInit {
  editedArtwork: Artwork
  artworkForm: FormGroup;
  artMedium = ArtMedium;
  artStyle = ArtStyle;
  artType = ArtType;
  types: string[];
  mediums: string[];
  styles: string[];
  fileName: string;

  constructor(public dialogRef: MatDialogRef<EditArtworkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private artistService: ArtistService,
              private fileService: FileService,
              private artworkService: ArtworkService) {
    this.types = Object.keys(this.artType).filter(f => isNaN(Number(f)));
    this.mediums = Object.keys(this.artMedium).filter(f => isNaN(Number(f)));
    this.styles = Object.keys(this.artStyle).filter(f => isNaN(Number(f)));
    this.editedArtwork = this.data.artwork

  }

  ngOnInit(): void {
    console.log(this.editedArtwork)
    this.artworkForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}, Validators.required),
      title: new FormControl({value: null, disabled: true}, Validators.required),
      size: new FormControl({value: null, disabled: false}, Validators.required),
      artType: new FormControl({value: null, disabled: false}, Validators.required),
      artMedium: new FormControl({value: null, disabled: false}, Validators.required),
      artStyle: new FormControl({value: null, disabled: false}, Validators.required),
      askingPrice: new FormControl({value: null, disabled: false}, Validators.required),
      artistId: new FormControl({value: null, disabled: true}, Validators.required),
      artistName: new FormControl({value: null, disabled: true}, Validators.required),
      collectorId: new FormControl({value: null, disabled: false}),
      fileId: new FormControl({value: 0, disabled: false}),
    });
    this.setData()
  }

  private setData() {
    this.artworkForm.get('id')?.setValue(this.editedArtwork.id);
    this.artworkForm.get('title')?.setValue(this.editedArtwork.title);
    this.artworkForm.get('size')?.setValue(this.editedArtwork.size);
    this.artworkForm.get('artType')?.setValue(this.editedArtwork.artType);
    this.artworkForm.get('artMedium')?.setValue(this.editedArtwork.artMedium);
    this.artworkForm.get('artStyle')?.setValue(this.editedArtwork.artStyle);
    this.artworkForm.get('askingPrice')?.setValue(this.editedArtwork.askingPrice);
    this.artworkForm.get('fileId')?.setValue(this.editedArtwork.fileId);
    this.artworkForm.get('artistId')?.setValue(this.editedArtwork.artistId);
    this.artworkForm.get('artistName')?.setValue(this.editedArtwork.artistName + " " + this.editedArtwork.artistSurname);
    this.artworkForm.get('collectorId')?.setValue(this.editedArtwork.collectorId);
    this.fileName = this.editedArtwork.fileName

  }

  selectFile($event: Event) {
    const target = event?.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileService.addFile(files[0]).subscribe(data => {
      this.artworkForm.get('fileId')!.setValue(data)
      this.fileName = files[0].name

    }, err => {
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: {message: "The field file exceeds its maximum permitted size of 1048576 bytes"}
      });
    });
  }

  deleteFile() {
    this.artworkForm.get('fileId')!.setValue(null)
    this.fileName = ""
  }

  onSubmit() {
    this.artworkService.updateArtwork(this.artworkForm).subscribe(
      response => {
        this.dialogRef.close({event: 'Success'});
      }
    );
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
