import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public hideMenu = true;
  public rotateDeg = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(): void {
    this.hideMenu =!this.hideMenu;
  }

}
