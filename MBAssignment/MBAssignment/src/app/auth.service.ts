import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { Manager } from './model/managerTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // base url
  private homeUrl: string = "http://localhost:8080/";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // manager signup with details
  signUp(managerTo: Manager) {
    debugger
    var b = this.decryptPassword(managerTo.password);

    return this.http.post(this.homeUrl + 'signup', managerTo);
  }

  // manager login
  login(data: any) {
    debugger
    return this.http.post(this.homeUrl + 'token', data, this.httpOptions)
  }

  // save current user details in the increpted form in local host
  doLogin(token: any) {
    localStorage.setItem('token', token.token);

  }

  // get current user from local storage
  getCurrentUser() {
    return localStorage.getItem('token')!;
  }

  // check whether user is logged in or not 
  isLoggedIn() {
    const currentUser = this.getCurrentUser();
    if (!!currentUser) {
      return true;
    }
    return false;
  }

  // logout user
  logout() {
    localStorage.removeItem('token');
  }


  // encrypt logged in user details before store in local storage
  encyptCurrentUser(password?: string) {
    return crypto.AES.encrypt(JSON.stringify(password), 'mysecret').toString();
  }

  // encrypt logged in user details before store in local storage
  decryptPassword(encryptedData: any) {
    return crypto.AES.decrypt(encryptedData, 'mysecret').toString(crypto.enc.Utf8);
  }

}


export interface MyToken {
  name: string;
  exp: number;
}