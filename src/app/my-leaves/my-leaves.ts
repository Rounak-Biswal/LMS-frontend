import { CommonModule, DatePipe } from "@angular/common"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILeave } from '../../models/Leave.model';
import { RouterLink } from "@angular/router";
import { ShowAllLeaves } from "../show-all-leaves/show-all-leaves";

@Component({
  selector: 'app-my-leaves',
  imports: [HttpClientModule, DatePipe, CommonModule, RouterLink, ShowAllLeaves],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css'
})
export class MyLeaves implements OnInit {
  http = inject(HttpClient)
  allLeaveData: ILeave[] = []

  //view detail
  currLeave: ILeave | null = null

  //delete confirmation
  dltConfirm: ILeave | null = null

  // Pagination variables
  paginatedLeaves: ILeave[] = []
  itemsPerPage = 9
  currentPage = 1
  totalPages = 1
  //----------------------

  ngOnInit(): void {
    this.getLeaves()
  }

  //api
  getLeaves() {
    this.http.get("http://127.0.0.1:8000/leave/all")
      .subscribe((res: any) => {
        this.allLeaveData = res
        this.totalPages = Math.ceil(this.allLeaveData.length / this.itemsPerPage)
        this.updatePaginatedLeaves()
      })
  }

  id: string = "688540c565661e8177eec4ac"
  showLeave(id: string) {
    this.http.get(`http://127.0.0.1:8000/leave/${id}`)
      .subscribe((res: any) => {
        this.currLeave = res;
      })
  }

  deleteLeave(id: string) {
    this.http.delete(`http://127.0.0.1:8000/leave/${id}/delete`)
      .subscribe((res: any) => {
        this.getLeaves()
        this.closeBtn()
      })
  }
  //-------------------------------------

  //change "status" bg color
  getStatusClassName(value: string) {
    if (value == "Pending")
      return "bg-warning-subtle p-2 rounded-1"
    else if (value == "Approved")
      return "bg-success-subtle p-2 rounded-1"
    else (value == "Rejected")
    return "bg-danger-subtle p-2 rounded-1"
  }
  //-------------------------------

  //pagination
  updatePaginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    this.paginatedLeaves = this.allLeaveData.slice(start, end)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePaginatedLeaves()
    }
  }
  //----------------------------------------

  //modal display
  closeBtn() {
    this.currLeave = null;
    this.dltConfirm = null;
  }

  //modal delete confirmation
  askConfirmation(id: string) {
    this.http.get(`http://127.0.0.1:8000/leave/${id}`)
      .subscribe((res: any) => {
        this.dltConfirm = res;
      })
  }
}
