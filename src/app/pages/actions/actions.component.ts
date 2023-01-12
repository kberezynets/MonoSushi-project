import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {

  public actions: Array<IActionResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private actionService: ActionService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadActions();
      }
    })
  }

  ngOnInit(): void {}

  loadActions(): void {
    this.actionService.getAll().subscribe(data => {
      this.actions = data;
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}