import { Component, OnInit,Input } from '@angular/core';
import { FacebookAppService } from '../../services/facebook.service';

@Component({
  selector: 'unpublished-posts',
  templateUrl: './unpublished-posts.component.html',
  styleUrls: ['./unpublished-posts.component.css']
})
export class UnpublishedPostsComponent implements OnInit {
  @Input() page;
  posts;
  empty:boolean;

  constructor(private facebookAppService: FacebookAppService) { }
  
    ngOnInit() {
      this.facebookAppService.getUnpublishedPosts(this.page.id,true).then((data)=>{
        this.posts=data;
        this.empty=this.posts.length==0;
      });
  
    }
}
