import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{SharedService} from 'src/app/shared.service'
import { Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader"; 



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service:SharedService, private router:Router, private ngxService: NgxUiLoaderService) { }
  UserName:string;
  Password:string;
  isLoginError : boolean = false;
  Error:string =""
  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      this.router.navigate(['/post']);
    }
  }
  onKey(event:any){
    if(this.UserName.length > 0){
    this.Error = "";
    this.isLoginError = false;
      }
      if(this.Password.length > 0){
        this.Error = "";
        this.isLoginError = false;
      }
  }
  login(){
    var val = {UserName:this.UserName,
                Password:this.Password
              };
    if(val.UserName==undefined || val.UserName.trim() == ""){
      this.isLoginError = true;
      this.Error = "Please enter username ";
      return;
    }
    if(val.Password==undefined || val.Password.trim() == ""){
      this.isLoginError = true;
      this.Error = "Please enter password ";
      return;
    }
    this.ngxService.start();
    this.service.getLoginToken(val).subscribe((data:any)=>{
    localStorage.setItem('userToken',data.access_token);
    this.router.navigate(['/post'])
    this.ngxService.stop();
    },
    (err : HttpErrorResponse)=>{
      this.ngxService.stop();
      console.log(err.error.error_description);
        this.isLoginError = true;
        if(err.error.error_description == undefined){
          this.Error = "Please contact with administrator";
        }else{
          this.Error = err.error.error_description;
        }
    });
  }
  register(){
    this.router.navigate(['/register'])
  }
  

  
}
