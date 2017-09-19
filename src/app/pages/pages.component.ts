import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router) { }

  ngOnInit() {
    this.facebookAppService.pages.subscribe((data)=>{
      this.pages=data;
    });
    this.facebookAppService.getUserPages();
  }

}
