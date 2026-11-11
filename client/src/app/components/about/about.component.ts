import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent {
  name: string = null;
  profile_pic = 'assets/unknown.jpg';
  profile_link: string = null;
  loading = false;
  error = '';

  constructor(private spotifyService: SpotifyService) { }

  async loadInfo() {
    this.loading = true;
    this.error = '';
    try {
      const profile = await this.spotifyService.aboutMe();
      this.name = profile.name;
      this.profile_pic = profile.imageURL;
      this.profile_link = profile.spotifyProfile;
    } catch {
      this.error = 'Could not load your profile. Check that the server is running and try again.';
    } finally {
      this.loading = false;
    }
  }
}
