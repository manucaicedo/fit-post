import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private facebookAppService: FacebookAppService,
    private router: Router) {
}

  ngOnInit() {
  }

  logInWithFacebook(){
    this.facebookAppService.logIn().then((response)=>{
      this.router.navigate(['pages']);
    });
  }


}
