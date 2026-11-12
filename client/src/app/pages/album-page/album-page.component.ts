import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, from, of, switchMap, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],
  standalone: false
})
export class AlbumPageComponent implements OnInit, OnDestroy {
  albumId: string;
  album: AlbumData;
  tracks: TrackData[];
  loading = false;
  error = '';
  private destroyed = new Subject<void>();

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    // React to ID changes even when Angular reuses the same page component.
    // switchMap prevents an older request from replacing the newest page.
    this.route.paramMap.pipe(
      switchMap(params => {
        this.albumId = params.get('id');
        this.album = null;
        this.error = '';
        this.loading = true;
        return from(Promise.all([
          this.spotifyService.getAlbum(this.albumId),
          this.spotifyService.getTracksForAlbum(this.albumId)
        ])).pipe(catchError(() => {
          this.error = 'Could not load this album. Check that the server is running and reload the page.';
          return of(null);
        }));
      }),
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.loading = false;
      if (result) { [this.album, this.tracks] = result; }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
