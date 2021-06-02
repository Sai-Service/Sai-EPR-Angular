import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { JobCardComponent } from './service/job-card/job-card.component';

@Injectable({
  providedIn: 'root'
})
export class DeActivateGuard implements CanDeactivate<JobCardComponent> {
  canDeactivate():boolean{
    return window.confirm("Are you sure to navigate ?")
  }
   
  
}
