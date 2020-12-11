import { Component, OnInit,Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() 
  username: string;
  @Input()
  Token: boolean;

  constructor(private router:Router) {
   
    
  }

  ngOnInit(): void {
    
  }
  signout(){
    localStorage.removeItem("userToken");
    this.Token = false;
    this.router.navigate(['/login'])
  }

}
