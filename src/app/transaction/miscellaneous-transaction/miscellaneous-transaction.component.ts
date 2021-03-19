
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';

interface miscellaneous
{

}
@Component({
  selector: 'app-miscellaneous-transaction',
  templateUrl: './miscellaneous-transaction.component.html',
  styleUrls: ['./miscellaneous-transaction.component.css']
})
export class MiscellaneousTransactionComponent implements OnInit {
  miscellaneousForm:FormGroup;
  public ItemIdList:Array<string>=[];

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService)
  {
    this.miscellaneousForm=fb.group({})
  }

  ngOnInit(): void {
    this.service.ItemIdList().subscribe(
      data =>{ this.ItemIdList = data;
        // console.log(this.invItemId);
        });
  }
  miscellaneous(miscellaneousForm:any){}

}
