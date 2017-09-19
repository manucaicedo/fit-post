import { Component, OnInit, Input } from '@angular/core';
import { FacebookAppService } from '../services/facebook.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'page-element',
  templateUrl: './page-element.component.html'
})
export class PageElementComponent implements OnInit {
  @Input('element') element: { id: string, name: string , picture}
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.element);
  }

  managePage(id){
    this.router.navigate(['page',id,'feed']);
  }

}