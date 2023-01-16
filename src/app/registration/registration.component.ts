import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServesService } from '../services/api-serves.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor (private fbuilder:FormBuilder,private apicall:ApiServesService) {}
   
  registerForm=this.fbuilder.group({
    accno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    userName:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    password:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]] 
  })

  register(){
   if(this.registerForm.valid){
    let accno=this.registerForm.value.accno
    let username=this.registerForm.value.userName
    let password=this.registerForm.value.password
    this.apicall.registerUser(username,accno,password).subscribe((result:any)=>{
      alert(result.message)
    },
    (result)=>{
      alert(result.error.message)
    })
   }else{
    alert('Please fill all fields')
   }
  }
}
