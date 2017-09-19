import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.page = this.facebookAppService.getPageDetails(id);
    
  }

  goToFeed(){
    this.router.navigate(['page',this.page.id,'feed']);
  }

  goToAds(){
    this.router.navigate(['page',this.page.id,'ads']);
  }
  
}
