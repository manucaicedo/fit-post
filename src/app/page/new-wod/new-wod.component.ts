import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../services/can-deactivate-guard.service';
import Textcomplete from 'textcomplete/lib/textcomplete';
import Textarea from 'textcomplete/lib/textarea';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { FacebookAppService } from '../../services/facebook.service';

@Component({
  selector: 'new-wod',
  templateUrl: './new-wod.component.html'
})
export class NewWodComponent implements OnInit, CanComponentDeactivate  {
  id: number;
  items: string[] = ["WARM UP", "Skill", "WOD", "Pull ups", "HSPU","Wall Balls", "Strict", "Press", "Jerk", "S2O", "Push ups", "HRPU", "DU", "Box jumps", "Deadlift", 
                    "Power", "Squat", "Clean", "Snatch", "Thruster", "Cluster", "AMRAP", "METCON", "Rounds", "OHS", "Front", "Back", "Run", "Row", "DB", "KB", "TTB", "T2B", "Hang", "Rest", 
                    "Push", "KB Swings", "Abmat sit-ups", "rep", "max", "air squats", "handstand walk", "v-ups", "SDHP", "95#/65#", "225#/155#", "135#/95#", "45#/35#", "20/14", "24/20", "155#/105#"];
  wodContent: string;
  date: string;
  changesSaved: boolean;
  dateScheduled:number;
  dateObject;
  constructor(private facebookAppService: FacebookAppService,
    private router: Router,
    private route: ActivatedRoute) { }
   myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    console.log(this.items);
    const editor = new Textarea(document.getElementById('wod'));
    const textcomplete = new Textcomplete(editor);
    textcomplete.register([{
      words: this.items,
      match: /\b(\w{2,})$/,
      search: function (term, callback) {
        callback(this.words.filter(word => { return word.toLowerCase().startsWith(term.toLowerCase()); }));
      },
      index: 1,
      replace: function (word) {
          return word + ' ';
      }
    }]);

    
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.dateScheduled&& this.wodContent&&!this.changesSaved){
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onDateChanged(event: IMyDateModel): void {
    console.log(event.epoc);
    this.dateScheduled=event.epoc;
    this.dateObject =event.jsdate;
}

  postWod(){
    this.facebookAppService.submitPost(this.id,this.wodContent.replace('\n','\r\n'),true).then((result)=>{
      console.log(result);
      this.changesSaved=true;
      this.router.navigate(['/page',this.id,'feed']);
    });
  }

  scheduleWod(){
    let today = new Date();
    if(this.dateObject.setHours(0,0,0,0)== today.setHours(0,0,0,0)){
      this.postWod();
    }
    this.facebookAppService.submitScheduledPost(this.id,this.wodContent.replace('\n','\r\n'),this.dateScheduled).then((result)=>{
      this.changesSaved=true;
      this.router.navigate(['/page',this.id,'feed']);
    }).catch((error)=>{
      console.error(error);
    });
  }
    

}