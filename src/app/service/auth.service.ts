import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/user'

  
  Getbycode(code:any){
    return this.http.get(this.apiurl+'/'+code)
  }GetAll(){
    return this.http.get(this.apiurl)
  }
  GetAllRole(){
    return this.http.get('http://localhost:3000/role')
  }
  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl,inputdata);
  }
  Updateuser(code:any ,inputdata:any){
    return this.http.put(this.apiurl+'/',inputdata)
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  GetUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }
}
