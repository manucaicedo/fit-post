import { Component, OnInit, Input } from '@angular/core';
import { FacebookAppService } from '../../services/facebook.service';

@Component({
  selector: 'single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  
  @Input('post') post: { id: string, message: string , story?:string, content:string, created_time:string, scheduled_publish_time?:number, date:string, time:string, reach:number,likes:number,actions}
  @Input('isPublished') isPublished:boolean;
  fbURL:string;
  deleted:boolean;
  scheduled:boolean;
  lines: string[];
  constructor(private facebookAppService: FacebookAppService) { }

  ngOnInit() {
    this.deleted=false;
    this.facebookAppService.getReach(this.post.id).then((response:number)=>{
      this.post.reach=response;
    });
    this.facebookAppService.getLikes(this.post.id).then((response:number)=>{
      this.post.likes=response;
    });
    this.fbURL=this.post.actions[0].link;
    let createdDate = new Date(this.post.created_time);
    let scheduledDate;
    if(this.post.scheduled_publish_time){
      scheduledDate= new Date(this.post.scheduled_publish_time* 1000);
      this.scheduled=true;
    }
    let date = scheduledDate ? scheduledDate:createdDate;
    this.post.content= this.post.message? this.post.message:this.post.story;
    this.post.date= date.toDateString();
    this.post.time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    this.lines=this.post.content.split('\n');
    console.log(this.lines);
  }

  deletePost(id:string){
    this.facebookAppService.deletePost(id).then((result)=>{
      this.deleted=true;
    }).catch((error)=>{
    })
  }

}