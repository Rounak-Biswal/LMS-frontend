import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import widgetsData from './data/widgets.json';
// import leaveStats from './data/leave_stats.json';
import { StatWidget } from '../stat-widget/stat-widget';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ILeave } from '../../models/Leave.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, StatWidget, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  http = inject(HttpClient)

  widgets: any[] = [];
  chartData: any[] = [];

  //widgets data
  allLeaveDataForWidgets: ILeave[] = []
  approvedLeaves: number = 0
  rejectedLeaves: number = 0
  pendingLeaves: number = 0

  //chart data
  allLeaveDataForChart: ILeave[] = []
  casuals: number = 0
  sicks: number = 0
  paids: number = 0
  paternities: number = 0
  unpaids: number = 0
  compensatories: number = 0


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

  ngOnInit(): void {
    this.getLeaveSummary()
    this.getChartSummary()
  }

  getLeaveSummary() {
    this.http.get("http://127.0.0.1:8000/leave/all")
      .subscribe((res: any) => {
        this.allLeaveDataForWidgets = res

        this.approvedLeaves = this.allLeaveDataForWidgets.filter((leave) => leave.status === "Approved").length
        this.rejectedLeaves = this.allLeaveDataForWidgets.filter((leave) => leave.status === "Rejected").length
        this.pendingLeaves = this.allLeaveDataForWidgets.filter((leave) => leave.status === "Pending").length

        this.widgets = [
          { count: this.approvedLeaves, label: 'Approved Leaves', bg: 'bg-success-subtle' },
          { count: this.pendingLeaves, label: 'Pending Leaves', bg: 'bg-warning-subtle' },
          { count: this.rejectedLeaves, label: 'Rejected Leaves', bg: 'bg-danger-subtle' }
        ]

        console.log(this.widgets)
      })
  }

  getChartSummary() {
    this.http.get("http://127.0.0.1:8000/leave/all")
      .subscribe((res: any) => {
        this.allLeaveDataForChart = res

        this.casuals = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Casual").length
        this.sicks = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Sick").length
        this.paids = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Paid").length
        this.paternities = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Paternity").length
        this.unpaids = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Unpaid").length
        this.compensatories = this.allLeaveDataForChart.filter((leave) => leave.status === "Approved" && leave.type === "Compensatory").length

        this.chartData = [
          { "name": "Casual", "value": this.casuals },
          { "name": "Sick", "value": this.sicks },
          { "name": "Paid", "value": this.paids },
          { "name": "Paternity", "value": this.paternities },
          { "name": "Unpaid", "value": this.unpaids },
          { "name": "Compensatory", "value": this.compensatories }
        ]
      })
  }
}
