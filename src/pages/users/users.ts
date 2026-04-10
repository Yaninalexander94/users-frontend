import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class Users {
}
