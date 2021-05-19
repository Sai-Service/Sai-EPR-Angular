// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CanDeactivateGuardService {
//   canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
// }
// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

//   canDeactivate(component: CanComponentDeactivate, 
//   route: ActivatedRouteSnapshot, 
//   state: RouterStateSnapshot) {
//     return component.canDeactivate ? component.canDeactivate() : true;
//   }

// }
// import { Injectable } from '@angular/core';
// import { CanDeactivate } from '@angular/router';
// // import { from, Observable } from 'rxjs';
// import { JobCardComponent } from './service/job-card/job-card.component';
// // import { JobCardComponent } from '../job-card/job-card.component';


// // export interface CanComponentDeactivate {
// //   canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
// // }

// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<JobCardComponent> {
//   canDeactivate(component: JobCardComponent):boolean{
//     if(component.createJobcardForm.dirty){
//     return confirm("Warning:Do you want to discard all the changes?");
//   }
//   return true;
// }
// }
