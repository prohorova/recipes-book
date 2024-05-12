import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
