import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import {SharedService} from './shared.service'
import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";




@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxUiLoaderModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
