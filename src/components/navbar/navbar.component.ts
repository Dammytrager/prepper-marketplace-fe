import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSearch = false;
  showMobile = false;

  constructor() {}

  ngOnInit() {}

}
