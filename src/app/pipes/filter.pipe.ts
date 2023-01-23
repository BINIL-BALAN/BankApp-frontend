import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTranscations:[],searchKey:string,transcationType:string): any [] {
    const result:any=[]
  if(!allTranscations || searchKey=='' || transcationType==''){
    return allTranscations
  }else{
    allTranscations.forEach((elem:any)=>{
      if(elem[transcationType].trim().toLowerCase().includes(searchKey.toLowerCase().trim())){
        result.push(elem)
      }
    })
    return result
  }
   
  }

}
