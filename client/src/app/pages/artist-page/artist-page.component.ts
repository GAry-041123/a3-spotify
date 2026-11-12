import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, from, of, switchMap, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  standalone: false
})
export class ArtistPageComponent implements OnInit, OnDestroy {
  artistId: string;
  artist: ArtistData;
  topTracks: TrackData[];
  albums: AlbumData[];
  loading = false;
  error = '';
  private destroyed = new Subject<void>();

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    // React to ID changes even when Angular reuses the same page component.
    // switchMap prevents an older request from replacing the newest page.
    this.route.paramMap.pipe(
      switchMap(params => {
        this.artistId = params.get('id');
        this.artist = null;
        this.error = '';
        this.loading = true;
        return from(Promise.all([
          this.spotifyService.getArtist(this.artistId),
          this.spotifyService.getTopTracksForArtist(this.artistId),
          this.spotifyService.getAlbumsForArtist(this.artistId)
        ])).pipe(catchError(() => {
          this.error = 'Could not load this artist. Check that the server is running and reload the page.';
          return of(null);
        }));
      }),
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.loading = false;
      if (result) { [this.artist, this.topTracks, this.albums] = result; }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
