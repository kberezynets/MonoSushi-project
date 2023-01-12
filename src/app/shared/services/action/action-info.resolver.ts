import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IActionResponse } from '../../interfaces/action/action.interface';
import { ActionService } from './action.service';

@Injectable({
  providedIn: 'root'
})
export class ActionInfoResolver implements Resolve<IActionResponse> {
  
  constructor (private actionService: ActionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActionResponse> {
    return this.actionService.getOne(Number(route.paramMap.get('id')));
  }
}