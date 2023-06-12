import {Component, OnInit} from '@angular/core';
import {ArtworkService} from "../_services/artwork.service";
import {MatDialog} from "@angular/material/dialog";
import {Artist} from "../_models/artist.model";
import {Artwork} from "../_models/artwork.model";
import {NewArtworkDialogComponent} from "../new-artwork-dialog/new-artwork-dialog.component";
import {ActiveArtistsDialogComponent} from "../active-artists-dialog/active-artists-dialog.component";
import {SellArtworkDialogComponent} from "../sell-artwork-dialog/sell-artwork-dialog.component";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {ApprovalDialogComponent} from "../approval-dialog/approval-dialog.component";
import {CustomerPreferenceDialogComponent} from "../customer-preference-dialog/customer-preference-dialog.component";
import {ImagePreviewComponent} from "../image-preview/image-preview.component";
import {FileService} from "../_services/file.service";
import {EditArtistDialogComponent} from "../edit-artist-dialog/edit-artist-dialog.component";
import {EditArtworkComponent} from "../edit-artwork/edit-artwork.component";

@Component({
  selector: 'app-on-sale',
  templateUrl: './on-sale.component.html',
  styleUrls: ['./on-sale.component.css']
})
export class OnSaleComponent implements OnInit {
  artworksList: Artwork[]
  // displayedColumns: string[] = ['title', 'artistName', 'artistSurname', 'artType', 'artMedium', 'artStyle', 'askingPrice', 'collectorName', 'collectorSurname', 'more'];
  displayedColumns: string[] = ['title', 'file', 'artistName', 'artistSurname', 'artType', 'artMedium', 'artStyle', 'askingPrice', 'more'];

  constructor(private artworkService: ArtworkService, public dialog: MatDialog, private fileService: FileService) {
  }

  ngOnInit(): void {
    this.loadArtworks()
  }

  private loadArtworks() {
    this.artworkService.getAllArtworksOnSale().subscribe(
      result => {
        this.artworksList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openAddArtworkDialog() {
    const dialogRef = this.dialog.open(NewArtworkDialogComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadArtworks();

      } else if (result.event == 'Error') {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '50%',
          data: {message: "Something went wrong. Try later."}
        })
      }
    })
  }

  removeArtwork(id: number) {
    this.dialog.open(ApprovalDialogComponent, {
      width: '600px',
      data: {message: "Are you sure you want to delete the Artwork?"}
    }).afterClosed().subscribe(response => {
      if (response.event == 'Approved') {
        this.artworkService.removeArtwork(id).subscribe(value => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: "Artwork deleted from collection"}
          })
          this.loadArtworks()
        }, error => {
          console.log(error.error)
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: error.error}
          })
        })
      }
    })

  }

  openSellArtworkDialog(artwork: Artwork) {
    const dialogRef = this.dialog.open(SellArtworkDialogComponent, {
      width: '50%',
      data: {artwork: artwork}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadArtworks();

      } else if (result.event == 'Error') {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '50%',
          data: {message: "Something went wrong. Try later."}
        })
      }
    })
  }

  customerPreferenceReport(artwork: Artwork) {
      const dialogRef = this.dialog.open(CustomerPreferenceDialogComponent, {
        width: '70%',
        data: {artwork: artwork}
      })


  }

  openImagePreview(fileId: number) {
    this.fileService.downloadFile(fileId).subscribe(response => {
      this.dialog.open(ImagePreviewComponent, {
        // minWidth: '190vh',
        maxWidth: '190vh',
        maxHeight: '80vh',
        minHeight: '80vh',
        height: '80vh',
        panelClass: 'custom-dialog-container',
        data: {
          url : response.url
        },

      })
    });
  }

  edit(artwork: Artwork) {
    const dialogRef = this.dialog.open(EditArtworkComponent, {
      width: '50%',
      data: {artwork: artwork}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadArtworks();
      }
    })
  }
}
