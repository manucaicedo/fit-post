import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';
import { NewWodComponent } from './page/new-wod/new-wod.component';
import { FeedComponent } from './page/feed/feed.component';
import { AdsComponent } from './page/ads/ads.component';
// import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pages',canActivate: [AuthGuard], component: PagesComponent},
  { path: 'page/:id', canActivate: [AuthGuard],canActivateChild:[AuthGuard], component: PageComponent,children:[
    {path:'feed',component:FeedComponent},
    {path:'ads',component:AdsComponent}
  ]},
  { path: 'newWod/:id', component: NewWodComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
