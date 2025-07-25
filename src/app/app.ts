import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Sidebar } from './sidebar/sidebar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Dashboard, Sidebar, NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LMS');
}
