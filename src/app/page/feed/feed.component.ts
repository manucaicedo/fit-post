import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  page;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.parent.snapshot.params['id'];
    console.log(id);
    this.page = this.facebookAppService.getPageDetails(id);
    
  }

  newWod(){
    this.router.navigate(['newWod',this.page.id]);
  }
}
