import { Component, OnInit } from '@angular/core';
import { FacebookAppService } from '../../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  postContent: string;
  page;
  posts;
  empty:boolean;
  locationBased:boolean;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.parent.snapshot.params['id'];
    console.log(id);
    this.page = this.facebookAppService.getPageDetails(id);
    this.refreshPosts();
  }

  submitPost(){
    console.log(this.locationBased);
    console.log(this.page);
    this.facebookAppService.submitPost(this.page.id,this.postContent,false,this.locationBased).then((response)=>{
      this.postContent='';
      this.refreshPosts();
    }).catch((error)=>{console.error(error)});
  }

  

  refreshPosts(){
    this.facebookAppService.getUnpublishedPosts(this.page.id,false).then((data)=>{
      this.posts=data;
      this.empty=this.posts.length==0;
    }).catch((error)=>{
      console.error(error);
    });
  }
}
