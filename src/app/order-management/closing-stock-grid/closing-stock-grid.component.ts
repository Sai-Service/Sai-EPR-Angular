import { Component, OnInit, HostListener, ViewChild, ElementRef ,NgModule} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlName } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from,Observable } from 'rxjs';
import { Url } from 'url';
import { FormsModule } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe ,Location} from '@angular/common';
import { data, get } from 'jquery';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-closing-stock-grid',
  templateUrl: './closing-stock-grid.component.html',
  styleUrls: ['./closing-stock-grid.component.css']
})
export class ClosingStockGridComponent implements OnInit {
  closingStockForm: FormGroup;
  closingStockDetails: any = [];

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.closingStockForm = this.fb.group({

    })
   }

   closingStock(closingStockForm) {
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");


    this.service.getClosingStock(Number(sessionStorage.getItem('ouId'))).subscribe((res: any) => {
        this.closingStockDetails = res;
        console.log(this.closingStockDetails); 
    })
  }
 
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Closing-Stock.xlsx');
  }

  
  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

}
