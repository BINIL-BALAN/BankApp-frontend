import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiServesService } from '../services/api-serves.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = 'user'
  accno: number = 0
  balance: number = 0
  constructor(private api: ApiServesService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username") || ''
  }

  checkBalance() {
    this.accno = JSON.parse(localStorage.getItem("acno") || '')
    console.log('from localstorage (1) =>',this.accno);
    this.api.getBalance(this.accno).subscribe(
      (result: any) => {
        this.balance=result.balance
        console.log('Inside check balance',result.balance);
        
      },
      (result) => {
        console.log('inside reject=>',result.error.message);
      }
    )
  }


}
