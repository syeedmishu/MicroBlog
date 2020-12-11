import { ErrorHandler, Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError,pipe,of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

    readonly APIUrl = "http://localhost:1803/";
    constructor(private http:HttpClient) { 
  
    }
    getUserName():Observable<any[]>{
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.get<any>(this.APIUrl+'api/Account/UserInfo',opts);
    }
    registration(val:any){
      return this.http.post(this.APIUrl+'api/Account/Register',val);
    }
    getLoginToken(val:any)
    {
      var headersForTokenAPI = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
      var data = "grant_type=password&username="+val.UserName+"&password="+val.Password;
      return this.http.post(this.APIUrl+'token',data,{ headers: headersForTokenAPI});
       
    }
  
    getPostList():Observable<any[]>{
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.get<any>(this.APIUrl+'api/Post',opts);
    }
    createPost(val:any){
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.post(this.APIUrl+'api/Post/Create',val,opts);
    }
    createComment(val:any){
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.post(this.APIUrl+'api/comment/Create',val,opts);
    }
    upvote(val:any){
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.post(this.APIUrl+'api/Post/Upvote',val,opts);
    }
    downvote(val:any){
      const opts = {
        headers: new HttpHeaders({
          'Authorization':'Bearer '+ localStorage.getItem("userToken")
        })
      }
      return this.http.post(this.APIUrl+'api/Post/Downvote',val,opts);
    }
    
}
