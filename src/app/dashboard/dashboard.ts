import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import widgetsData from './data/widgets.json';
import leaveStats from './data/leave_stats.json';
import { StatWidget } from '../stat-widget/stat-widget';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, StatWidget],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  widgets = widgetsData;
  chartData = leaveStats;

  view: [number, number] = [600, 300];

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Leave Type';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  colorScheme: Color = {
    domain: ['#f2994a', '#234088', '#f2994a', '#234088', '#e0e0e0', '#e0e0e0'],
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal
  };
}
