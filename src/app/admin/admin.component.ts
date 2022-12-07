import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navStyle = 'standard-nav';

  constructor() { }

  ngOnInit(): void {
  }

  styleChange(): void {
    this.navStyle = 'active-nav';
  }
}

// bntStyle: string;
//   AppComponent() {

//    this. bntStyle = 'btn-default';
//   }
//   submit() {
//     this.bntStyle = 'btn-change';

//   }
