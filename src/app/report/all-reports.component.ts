import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  decimal_value:number;
  constructor() { 
  }

  ngOnInit(): void {
   this.decimal_value=100.8999777789; 
  }

}
