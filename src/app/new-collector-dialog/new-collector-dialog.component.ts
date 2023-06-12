import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArtistService} from "../_services/artist.service";
import {CollectorService} from "../_services/collector.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";

@Component({
  selector: 'app-new-collector-dialog',
  templateUrl: './new-collector-dialog.component.html',
  styleUrls: ['./new-collector-dialog.component.scss']
})
export class NewCollectorDialogComponent implements OnInit {
  newCollectorForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewCollectorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private collectorService: CollectorService,
              private dialog: MatDialog,) {
    dialogRef.disableClose = true;

  }

  ngOnInit(): void {
    this.newCollectorForm = new FormGroup({
      name: new FormControl({value: null, disabled: false}, Validators.required),
      surname: new FormControl({value: null, disabled: false}, Validators.required),
      address: new FormControl({value: null, disabled: false}, Validators.required),
      phone: new FormControl({value: null, disabled: false}, Validators.required),
      ssn: new FormControl({value: null, disabled: false}, Validators.required),
    });
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  onSubmit() {
    this.collectorService.checkCollectorSSNExist(this.newCollectorForm.get('ssn')!.value).subscribe(
      collectorAlreadyExist => {
        console.log(collectorAlreadyExist);
        if (collectorAlreadyExist) {
          this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: {message: "artist with this SSN is already in the artist base"}
          });
        } else {
          this.collectorService.addCollector(this.newCollectorForm).subscribe(
            response => {
              this.dialogRef.close({event: 'Success'});
            }
          );

        }
      }
    );
  }
}
