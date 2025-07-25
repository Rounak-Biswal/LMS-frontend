import { CommonModule, DatePipe } from "@angular/common"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILeave } from '../../models/Leave.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-leaves',
  imports: [HttpClientModule, DatePipe, CommonModule, RouterLink],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css'
})
export class MyLeaves implements OnInit {
  http = inject(HttpClient)
  allLeaveData: ILeave[] = []

  ngOnInit(): void {
    this.getLeaves()
  }

  getStatusClassName(value: string) {
    if (value == "Pending")
      return "bg-warning-subtle p-2 rounded-1"
    else if (value == "Approved")
      return "bg-success-subtle p-2 rounded-1"
    else (value == "Rejected")
    return "bg-danger-subtle p-2 rounded-1"
  }

  getLeaves() {
    this.http.get("http://127.0.0.1:8000/leave/all").subscribe((res: any) => {
      this.allLeaveData = res
    })
  }
}
