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
  selector: 'app-sales-order-model-wise-price',
  templateUrl: './sales-order-model-wise-price.component.html',
  styleUrls: ['./sales-order-model-wise-price.component.css']
})
export class SalesOrderModelWisePriceComponent implements OnInit {
  modelWisePriceForm:FormGroup;
  modelWisePriceList:any=[];

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location,
    private router1: ActivatedRoute, private service: MasterService) { 
      this.modelWisePriceForm = this.fb.group({})
    }

  ngOnInit(): void {

    this.service.getModelWisePrice().subscribe((res: any) => {
        this.modelWisePriceList = res;
        console.log(this.modelWisePriceList);
    })
  }

  modelWisePrice(modelWisePriceForm) {
  }


  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      // xlsx.utils.json_to_sheet(this.storeAllOrderData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'ModelWisePrice.xlsx');
  }

}
