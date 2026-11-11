import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  expressBaseUrl = 'http://127.0.0.1:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    // Reject failures so views can show an error and allow a retry.
    return firstValueFrom(this.http.get(this.expressBaseUrl + endpoint));
  }

  aboutMe(): Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then(data => new ProfileData(data));
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    if (!['artist', 'album', 'track'].includes(category)) {
      return Promise.reject(new Error('Unsupported search category'));
    }
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource))
      .then(data => data[category + 's'].items.map(item => {
        switch (category) {
          case 'artist': return new ArtistData(item);
          case 'album': return new AlbumData(item);
          default: return new TrackData(item);
        }
      }));
  }

  getArtist(artistId: string): Promise<ArtistData> {
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId))
      .then(data => new ArtistData(data));
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId))
      .then(data => data.tracks.map(track => new TrackData(track)));
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId))
      .then(data => data.items.map(album => new AlbumData(album)));
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId))
      .then(data => new AlbumData(data));
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId))
      .then(data => data.items.map(track => new TrackData(track)));
  }

  getTrack(trackId: string): Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId))
      .then(data => new TrackData(data));
  }
}
