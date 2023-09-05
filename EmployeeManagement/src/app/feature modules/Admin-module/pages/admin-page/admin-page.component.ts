import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(private auth: ApiService) { }

  // Function to logout

  logout() {
    // Remove HR from local storage
    localStorage.removeItem('HRuser');
    this.auth.logout();
  }
}
