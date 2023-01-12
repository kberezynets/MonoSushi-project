import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent implements OnInit{

  public action!: IActionResponse;
  public descriptionItems!: Array<string>;
  public bullet = '\u{2022}';

  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneAction();
  }

  getOneAction(): void {
    const ACTION_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionService.getOne(ACTION_ID).subscribe(data => {
      this.action = data;
      this.descriptionItems = this.action.description.split(". ");
    })
  }
}