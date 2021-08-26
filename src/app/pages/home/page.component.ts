import { Component, OnInit } from '@angular/core';
import { ActivisionService } from 'src/app/_services/activision.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private warzone: ActivisionService) { }

  ngOnInit(): void {

   var res = this.warzone.getWarzoneInfo('Lierrmm#2364', 'psn');

  }

}
