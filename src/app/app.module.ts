import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FacebookService } from 'ngx-facebook';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FacebookAppService } from './services/facebook.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';
import { NewWodComponent } from './page/new-wod/new-wod.component';
import { AuthGuard } from './services/auth-guard.service';
import { PageElementComponent } from './pages/page-element.component';
import { UnpublishedPostsComponent } from './page/unpublished-posts/unpublished-posts.component';
import { PublishedPostsComponent } from './page/published-posts/published-posts.component';
import { SinglePostComponent } from './page/single-post/single-post.component'
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { NewPostComponent } from './page/new-post/new-post.component';
import { FeedComponent } from './page/feed/feed.component';
import { AdsComponent } from './page/ads/ads.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PagesComponent,
    PageComponent,
    NewWodComponent,
    PageElementComponent,
    UnpublishedPostsComponent,
    PublishedPostsComponent,
    SinglePostComponent,
    NewPostComponent,
    FeedComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [FacebookService,FacebookAppService, CanDeactivateGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
