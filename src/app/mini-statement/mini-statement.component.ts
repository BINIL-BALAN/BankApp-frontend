import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import 'jspdf-autotable'
import { ApiServesService } from '../services/api-serves.service';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css']
})
export class MiniStatementComponent implements OnInit{
  allTranscations:any
  slNo:number=1
  searchKey:string=''
  constructor(private api:ApiServesService){}
 ngOnInit(): void {
     this.api.getTranscstions().subscribe((result:any)=>{
        this.allTranscations=result.trancations
     })
 }
 search(event:any){
    this.searchKey=event.target.value
 }

 genderatePDF(){
   var pdf= new jspdf()
   let col =['Type','From account','To account','Amount']
   let row:any=[]
   pdf.setFontSize(16)
   pdf.text('Transcation History',11,8),
   pdf.setFontSize(12)
   pdf.setTextColor(99)

   var itemNew=this.allTranscations
   itemNew.forEach(element => {
      var temp = [element.type,element.fromAcno,element.toAcno,element.amount]
      row.push(temp)
   });

   (pdf as any).autoTable(col,row,{startY:10})
   pdf.save('Transcations.pdf')
 }
}
