import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import{SharedService} from 'src/app/shared.service'
import { Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader"; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:SharedService, private router:Router,private ngxService: NgxUiLoaderService) { }
  @Input() user:any;
  UserName:string;
  Password:string;
  ConfirmPassword:string;
  isRegistrationError : boolean = false;
  Error:string="";
  isSuccess:boolean = false;
  SuccessMessage:string = "";

  ngOnInit(): void {
  }
  onKey(event:any){
    if(this.UserName.trim().length > 0){
    this.Error = "";
    this.isRegistrationError = false;
      }
      if(this.Password.trim().length >= 6){
        this.Error = "";
      this.isRegistrationError = false;
      }
      if(this.ConfirmPassword.trim() == this.Password.trim()){
        this.Error = "";
      this.isRegistrationError = false;
      }
  }

  registerUser(){
   
    var val = {UserName:this.UserName,
      Password:this.Password,
      ConfirmPassword:this.ConfirmPassword
    };
    if(val.UserName == undefined || val.UserName.trim() ==""){
      this.Error = "Username is required";
      this.isRegistrationError = true;
      return;
    }
    if(val.Password == undefined || val.Password.trim() == ""){
      this.Error = "Password is required";
      this.isRegistrationError = true;
      return;
    }
    if(val.Password.trim().length < 6){
      this.Error = "Password must be 6 digit or more";
      this.isRegistrationError = true;
      return;
    }
    if(val.Password != val.ConfirmPassword){
      this.Error = "Password and Confirm password do not match";
      this.isRegistrationError = true;
      return;
    }
    this.ngxService.start();
      this.service.registration(val).subscribe((data:any)=>{
        this.refreshForm();
        console.log(data);
        this.isSuccess = true;
        this.ngxService.stop();
        this.SuccessMessage = "Registration successful";
      },
      (err : HttpErrorResponse)=>{
        this.ngxService.stop();
          this.isRegistrationError = true;
          this.Error =err.error.modelState[""]["0"];

      });

  }
  login(){
    this.router.navigate(['/login'])
  }
  refreshForm(){
    this.UserName = "";
    this.Password="";
    this.ConfirmPassword = "";
    this.isRegistrationError = false;
  }

}
