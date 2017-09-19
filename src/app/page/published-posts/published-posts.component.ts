import { Component, OnInit, Input } from '@angular/core';
import { FacebookAppService } from '../../services/facebook.service';

@Component({
  selector: 'published-posts',
  templateUrl: './published-posts.component.html',
  styleUrls: ['./published-posts.component.css']
})
export class PublishedPostsComponent implements OnInit {
  @Input() page;
  posts;
  postContent: string;
  empty:boolean;
  morePosts:boolean;
  nextCursor?:string;
  city: string;

  constructor(private facebookAppService: FacebookAppService) { }

  ngOnInit() {
    this.refreshPosts();
  }

  submitPost(){
    this.postContent= this.postContent.concat(" from "+ this.city);
    this.facebookAppService.submitPost(this.page.id,this.postContent,true).then((response)=>{
      this.postContent='';
      this.refreshPosts();
    });
  }

  refreshPosts(){
    this.facebookAppService.getFeed(this.page.id).then((result)=>{
      console.log(result);
      this.posts=result['data'];
      this.empty=this.posts.length==0;
      if(result['paging'].next){
        this.morePosts=true;
        this.nextCursor=result['paging'].cursors.after;
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

  fetchMorePosts(){
    this.facebookAppService.getFeed(this.page.id,this.nextCursor).then((result)=>{
      this.posts=this.posts.concat(result['data']);
      this.empty=this.posts.length==0;
      if(result['paging'].next){
        this.morePosts=true;
        this.nextCursor=result['paging'].cursors.after;
      } else{
        this.morePosts=false;
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

}
