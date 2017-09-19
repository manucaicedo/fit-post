import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FacebookAppService } from '../../services/facebook.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit  {
  id: number;
  postContent: string;
  doPublish:boolean;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.doPublish=true;
    
  }

  postAnnouncement(){
    this.facebookAppService.submitPost(this.id,this.postContent.replace('\n','\r\n'),this.doPublish).then((result)=>{
        this.postContent='';
        this.doPublish=false;
        this.router.navigate(['/page',this.id]);
    });
  }
    

}