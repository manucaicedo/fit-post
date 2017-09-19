import { Injectable } from '@angular/core';
import { FacebookService, InitParams,LoginOptions } from 'ngx-facebook';
import { Subject } from 'rxjs/Subject';
  
@Injectable()  
export class FacebookAppService{
    userInSession = new Subject();
    pages = new Subject();
    private pagesArray;
    private user;
    constructor(private fb: FacebookService) {
        let initParams: InitParams = {
            appId: '386909645045037',
            xfbml: true,
            version: 'v2.10'
          };
    
          this.fb.init(initParams);
    }

    logIn() {
        const promise = new Promise(
            (resolve, reject) => {
                const options: LoginOptions = {
                    scope: 'public_profile,manage_pages,publish_pages,publish_actions',
                    return_scopes: true,
                    enable_profile_selector: true
                  };
          
                  this.fb.login(options)
                    .then((response)=>{
                        console.log(response);
                        this.fb.api('/me','get').then((response)=>{
                            console.log(response);
                            this.user=response;
                            this.userInSession.next(this.user);
                            resolve(response);
                        });
                    });
            }
          );
          return promise;
      }

      logOut(){
        const promise = new Promise(
            (resolve, reject) => {
          this.fb.logout().then(()=>{
              resolve(true);
          });
        });
        return promise;
      }

    getUserPages(){
        if(!this.pagesArray){
            this.pagesArray=[];
            this.fb.api('/me/accounts','get').then((response)=>{
                this.user.multiplePages=response.data.length>0;
                this.userInSession.next(this.user);
                response.data.forEach(element => {
                    this.fb.api(element.id,'get',{fields:'id,name,access_token,picture,location'}).then((response)=>{
                        console.log(response)
                        this.pagesArray.push({
                            name: element.name,
                            id: element.id,
                            picture: response.picture,
                            access_token: element.access_token,
                            location: response.location
                        });
                        this.pages.next(this.pagesArray);
                    });
                    
            });
        });
        } else {
            console.log(this.pagesArray);
            this.pages.next(this.pagesArray);
        }
    }

    isAuthenticated(){
        if(this.user){
            console.log(this.user);
            return true;
        }
        else{
            return false;
        }
    }

    getPageDetails(id:number){
        const page=this.pagesArray.find((element)=>{
            if(element.id==id){
                return element;
            }
        });
        return page;
    }

    getFeed(id:number,next?:string){
        console.log(next);
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(id+'/feed','get',{limit:25,fields:'id,message, story,created_time,actions,is_published,picture',after:next}).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        });
        return promise;
    }

    getUnpublishedPosts(id:number,scheduled:boolean){
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(id+'/promotable_posts','get',{"fields":"id,message,scheduled_publish_time,created_time,actions","is_published":"false"}).then((result)=>{
                let resultPosts;
                if(scheduled){
                    resultPosts=result.data.filter((post)=>{
                        if(post.scheduled_publish_time){
                            return true;
                        }
                    });
                }
                else{
                    resultPosts=result.data.filter((post)=>{
                        if(!post.scheduled_publish_time){
                            return true;
                        }
                    });
                }
                resolve(resultPosts);
            }).catch((error)=>{
                reject(error);
            });
        });
        return promise;
    }

    submitPost(pageId:number, content:string, publish:boolean,locationBased?:boolean){
        let page = this.getPageDetails(pageId);
        if(locationBased){
            let geoLocation={geo_locations:{cities:this.pages['city']}};
            const promise = new Promise(
                (resolve, reject) => {
                this.fb.api(pageId+'/feed','post',{message:content, published:publish, access_token: page['access_token'],feed_tageting:geoLocation}).then((result)=>{
                    resolve(result);
                }).catch((error)=>{
                    reject(error);});
            });
            return promise;
        } else{
        
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(pageId+'/feed','post',{message:content, published:publish, access_token: page['access_token']}).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);});
        });
        return promise;
        }
    }

    submitScheduledPost(pageId:number, content:string, scheduledDate:number){
        let page = this.getPageDetails(pageId);
        console.log(page);
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(pageId+'/feed','post',{message:content, scheduled_publish_time:scheduledDate,published:false,access_token: page['access_token']}).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);});
        });
        return promise;
    }

    getReach(postId:string){
        let access_token = this.getPageDetails(+postId.split('_')[0]).access_token;
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(postId+'/insights/post_impressions_unique','get',{access_token:access_token}).then((result)=>{
                let reach;
                if(result.data.length==0){
                    reach=0
                }
                else{
                    reach=result.data.values[0].value;
                }
                resolve(reach);
            }).catch((error)=>{
                reject(error);});
        });
        return promise;
    }

    getLikes(postId:string){
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(postId+'/likes','get',{summary:true}).then((result)=>{
                resolve(result.summary.total_count);
            }).catch((error)=>{
                reject(error);});
        });
        return promise;
    }

    deletePost(postId:string){
        let access_token = this.getPageDetails(+postId.split('_')[0]).access_token;
        const promise = new Promise(
            (resolve, reject) => {
            this.fb.api(postId,'delete', {access_token:access_token}).then((result)=>{
                console.log(result);
                resolve(result);
            }).catch((error)=>{
                reject(error);});
        });
        return promise;
    }

  }