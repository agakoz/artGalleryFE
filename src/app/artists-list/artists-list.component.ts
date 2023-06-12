import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../_services/artist.service";
import {MatDialog} from "@angular/material/dialog";
import {Artist} from "../_models/artist.model";
import {ActiveArtistsDialogComponent} from "../active-artists-dialog/active-artists-dialog.component";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {NewArtistDialogComponent} from "../new-artist-dialog/new-artist-dialog.component";
import {NewArtworkDialogComponent} from "../new-artwork-dialog/new-artwork-dialog.component";
import {ApprovalDialogComponent} from "../approval-dialog/approval-dialog.component";
import {EditArtistDialogComponent} from "../edit-artist-dialog/edit-artist-dialog.component";
import {ArtistArtworkReportComponent} from "../artistartworkreport/artist-artwork-report.component";

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.css',]
})
export class ArtistsListComponent implements OnInit {

  constructor(private artistService: ArtistService, public dialog: MatDialog) {
  }

  artistsList: Artist[]
  displayedColumns: string[] = ['position', 'name', 'surname', 'address', 'phone', 'ssn', 'usualType', 'usualMedium', 'usualStyle', 'more'];

  ngOnInit(): void {
    this.loadArtists()
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe(
      result => {
        this.artistsList = result;
      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openActiveArtistDialog(): void {

    this.artistService.getActiveAllArtists().subscribe(
      result => {
        // this.artistsList = result;
        if (result.length > 0) {
          const dialogRef = this.dialog.open(ActiveArtistsDialogComponent, {
            width: '80%',
            data: {artists: result}
          });
        } else {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '400px',
            data: {message: "No active artists to show"}
          });
        }

      },
      err => {
        // this.errorMessage = err.error.message;
      });
  }

  openAddArtistDialog() {
    const dialogRef = this.dialog.open(NewArtistDialogComponent, {
      width: '50%',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadArtists();

      } else if (result.event == 'Error') {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '50%',
          data: {message: "Something went wrong. Try later."}
        })
      }
      ;
    });
  }

  addArtwork(artist: Artist) {
    const dialogRef = this.dialog.open(NewArtworkDialogComponent, {
      width: '50%',
      data: {artist: artist}
    })
    //   .afterClosed().subscribe(result => {
    //   if (result.event == 'Success') {
    //     this.loadArtists();
    //
    //   } else {
    //     const dialogRef = this.dialog.open(InfoDialogComponent, {
    //       width: '50%',
    //       data: {message: "Something went wrong. Try later."}
    //     })
    //   };
    // });
  }

  delete(id: number) {
    this.dialog.open(ApprovalDialogComponent, {
      width: '600px',
      data: {message: "Are you sure you want to delete the Artist from list together with artworks that are currently on sale? The person will still be visible on related sales."}
    }).afterClosed().subscribe(response => {
      if (response.event == 'Approved') {
        this.artistService.removeArtist(id).subscribe(value => {
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '50%',
            data: {message: "Artist deleted"}
          })
          this.loadArtists()
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

  editArtist(artist: Artist) {
    const dialogRef = this.dialog.open(EditArtistDialogComponent, {
      width: '50%',
      data: {artist: artist}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadArtists();
      }
    })
  }

  showArtworks(artist: Artist) {
    this.artistService.getArtworksFromArtist(artist.id).subscribe(result => {
      if (result.length > 0) {
        const dialogRef = this.dialog.open(ArtistArtworkReportComponent, {
          width: '60%',
          data: {artist: artist, artworks: result}
        })
      } else {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: {message: "Artist has no artworks assigned"}
        });
      }

    })


  }
}
