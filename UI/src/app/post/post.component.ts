import { Component,OnInit } from '@angular/core';
import{SharedService} from 'src/app/shared.service'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader"; 

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor( private service:SharedService,private router:Router,private ngxService: NgxUiLoaderService) { }
  PostList:any = [];
  ModalTitle:string;
  PostTitle:string;
  PostDescription:string;
  Token: boolean = false;
  username:any;
  Error:string =""
  IsError: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      this.service.getUserName().subscribe(dt=>{
        if(dt.toString()){
          this.Token = true;
          this.username = dt.toString();
        }else{
          this.reset();
        }
      })
     
    }else{
      this.router.navigate(['/login'])
    }
    this.refreshPostList();
  }
 reset(){
  localStorage.removeItem("userToken");
  this.Token = false;
  this.router.navigate(['/login'])
 }
  refreshPostList(){
    this.service.getPostList().subscribe(data=>{
      this.PostList = data;
    },
    (err : HttpErrorResponse)=>{
      if(err.status == 401){
        localStorage.removeItem("userToken");
        this.router.navigate(['/login'])
      }
  })
  }
  onKey(event:any){
    if(this.PostDescription.trim().length > 0){
    this.Error = "";
    this.IsError = false;
      }
  }
  addPost(){
    var val = 
            {
            PostDescription:this.PostDescription
            };
    if(val.PostDescription == undefined || val.PostDescription.trim() == ""){
      this.IsError = true;
        this.Error = "Please Write something";
        return;
    }
    this.ngxService.start();
    this.service.createPost(val).subscribe(res=>{
      this.refreshPostList();
      this.refreshPostform();
      this.ngxService.stop();
      
    },(err : HttpErrorResponse)=>{
      this.ngxService.stop();
      if(err.status == 401){
        localStorage.removeItem("userToken");
        this.router.navigate(['/login'])
      }
  });
  }
  refreshPostform(){
    this.PostTitle = ""
    this.PostDescription="";
  }
  addComment(postid, description){
    var val = 
    {
      CommentDescription:description,
      PostID:postid
    };
    if(val.CommentDescription == undefined || val.CommentDescription.trim() == ""){
      return;
    }
      this.service.createComment(val).subscribe(res=>{
          this.refreshPostList();
    },(err : HttpErrorResponse)=>{
      if(err.status == 401){
        localStorage.removeItem("userToken");
        this.router.navigate(['/login'])
      }
  }); 
  }

  upvote(postid){
    var val = {
      PostID:postid
    }
    this.service.upvote(val).subscribe(res=>{
      this.refreshPostList();
      },(err : HttpErrorResponse)=>{
        if(err.status == 401){
          localStorage.removeItem("userToken");
          this.router.navigate(['/login'])
        }
    }); 
  }

  downvote(postid){
    var val = {
      PostID:postid
    }
    this.service.downvote(val).subscribe(res=>{
      this.refreshPostList();
      },(err : HttpErrorResponse)=>{
        if(err.status == 401){
          localStorage.removeItem("userToken");
          this.router.navigate(['/login'])
        }
    }); 
  }


}
