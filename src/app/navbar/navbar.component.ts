import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../services/facebook.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  isLoggedIn:boolean;
  multiplePages:boolean;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn=false;
    this.facebookAppService.userInSession.subscribe((data)=>{
      
      this.user=data;
      this.isLoggedIn=true;
      this.multiplePages=this.user.multiplePages;
    }
    );
  }

  logOut(){
    console.log("logout");
    this.facebookAppService.logOut().then(()=>{
        this.isLoggedIn=false;
        this.router.navigate(['']);
    });
    
  }

  logInWithFacebook(){
    this.facebookAppService.logIn().then((response)=>{
      this.router.navigate(['pages']);
    });
  }

  goToPages(){
    this.router.navigate(['pages']);
  }
}
