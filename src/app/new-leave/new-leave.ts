import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILeave } from '../../models/Leave.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-leave',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './new-leave.html',
  styleUrl: './new-leave.css'
})
export class NewLeave implements OnInit {
  http = inject(HttpClient)

  newLeave = {
    type: "",
    from_date: "",
    to_date: "",
    reason: "",
    days: 0,
    status: "Pending"
  };

  ngOnInit(): void {

  }

  //api
  applyLeave() {
    const from = new Date(this.newLeave.from_date)
    const to = new Date(this.newLeave.to_date)

    //invalid date validation
    if (to < from) {
      alert("❗ Invalid date range.\nPlease ensure 'To Date' is not earlier than 'From Date'.");

      return;
    }

    let days = to.getTime() - from.getTime()    //return milliseconds
    this.newLeave.days = (days / (1000 * 60 * 60 * 24)) + 1   //convert ms -> day
    console.log(this.newLeave)

    this.http.post("http://127.0.0.1:8000/leave/apply", this.newLeave)
      .subscribe((res: any) => {
        this.newLeave = {
          type: "",
          from_date: "",
          to_date: "",
          reason: "",
          days: 0,
          status: "Pending"
        }
      })
  }
}
