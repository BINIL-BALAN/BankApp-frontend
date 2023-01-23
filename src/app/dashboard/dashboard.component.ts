import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServesService } from '../services/api-serves.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toggleMsg:string='more'
  toggleState:boolean=true
  username: string = 'user'
  accno: number = 0
  balance: number = 0
  depositeMsg: string = ''
  depositeMsgClass: string = ''
  transferMessage:string=''
  constructor(private api: ApiServesService, private fbuilder: FormBuilder) { }
  depositform = this.fbuilder.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  //form builder for fund transfer
  transferFund = this.fbuilder.group({
    toaccno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })


  ngOnInit(): void {
    this.username = localStorage.getItem("username") || ''
  }

toggle(){
  this.toggleState=!this.toggleState
    if(this.toggleState){
      this.toggleMsg='more'
    }else{
      this.toggleMsg='less'
    }
}

  checkBalance() {
    this.accno = JSON.parse(localStorage.getItem("acno") || '')
    console.log('from localstorage (1) =>', this.accno);
    this.api.getBalance(this.accno).subscribe(
      (result: any) => {
        this.balance = result.balance
        console.log('Inside check balance', result.balance);

      },
      (result) => {
        console.log('inside reject=>', result.error.message);
      }
    )
  }

  deposit() {
    if (this.depositform.valid) {
      let amount = this.depositform.value.amount
      this.accno = JSON.parse(localStorage.getItem("acno") || '')
      this.api.depositAmount(this.accno, amount).subscribe((result: any) => {
        this.depositeMsgClass = 'text-success'
        this.depositeMsg = result.message
        setTimeout(() => {
          this.depositeMsg = ''
          this.depositform.reset()
        }, 5000)
      },
        (result: any) => {
          this.depositeMsgClass = 'text-danger'
          this.depositeMsg = result.error.message
          setTimeout(() => {
            this.depositeMsg = ''
            this.depositform.reset()
          }, 5000)

        }
      )
    } else {
      alert('Invalid amount')
    }
  }
  trensfer() {
 if(this.transferFund.valid) {  
  let toacno=this.transferFund.value.toaccno
    let password=this.transferFund.value.password
    let amount=this.transferFund.value.amount
    this.api.fundTransfer(toacno,password,amount).subscribe((result:any)=>{
      this.transferMessage=result.message
    },
    (result:any)=>{
      this.transferMessage=result.error.message
    }
    )
  }else{
    alert("Fill all field correctly")
  }
  }

  clearFundTransferForm(){
    this.transferMessage=''
    this.transferFund.reset()
  }
}
