import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiServesService {

  constructor(private api: HttpClient) { }
  appendToken() {
    const token = localStorage.getItem("token") || ''
    let headers = new HttpHeaders()
    if (token) {
    headers = headers.append('access-token',token)
    options.headers=headers
    }
    return options  
  }

  registerUser(username: any, accno: any, password: any) {
    const userData = {
      username,
      accno,
      password
    }
    return this.api.post('http://localhost:3000/register', userData)
  }


  login(accno: any, password: any) {
    const userData = {
      accno,
      password
    }
    return this.api.post('http://localhost:3000/login', userData)
  }

  getBalance(accno: number) {
    return this.api.get('http://localhost:3000/getBalance/' + accno,this.appendToken())
  }


}
