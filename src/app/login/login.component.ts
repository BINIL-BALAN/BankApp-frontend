import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiServesService } from '../services/api-serves.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg: string = ''
  successMsg: boolean = false
  constructor(private fbuilder: FormBuilder, private api: ApiServesService, private router: Router) { }
  loginForm = this.fbuilder.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })

  login() {
    if (this.loginForm.valid) {
      let accountNumber = this.loginForm.value.accno
      let password = this.loginForm.value.password
      this.api.login(accountNumber, password).subscribe((result:any) => {
        this.successMsg = true
        console.log(result.currentAcno);
        localStorage.setItem("username",result.username)
        localStorage.setItem("acno",JSON.stringify(result.currentAcno))
        localStorage.setItem("token",result.token)
        setTimeout(() => {
          this.router.navigateByUrl('bankApplication/dashboard')
        }, 2000)
      },
        (result) => {
          this.errorMsg = result.error.msg
        }
      )
    } else {
      alert('Invalid form')
    }


  }
}
