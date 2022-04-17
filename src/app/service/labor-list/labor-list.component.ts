import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-labor-list',
  templateUrl: './labor-list.component.html',
  styleUrls: ['./labor-list.component.css']
})
export class LaborListComponent implements OnInit {
  laborListForm: FormGroup;
  laborListDetails:any=[];
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.laborListForm = this.fb.group({

    })
  }

  laborList(laborListForm) {
  }


  ngOnInit(): void {
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='Data Loading in progress....Do not refresh the Page'
    this.service.getLaborByUser(sessionStorage.getItem('ouId')).subscribe((res: any) => {
        this.laborListDetails = res;
        this.dataDisplay ='Data Display Sucessfully....'
        this.closeResetButton=true;
    })
  }


  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Labor List.xlsx');
  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }

}
