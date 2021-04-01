import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
interface IArInvoice {
  // poHeaderId: number;
}
@Component({
  selector: 'app-arinvoice',
  templateUrl: './arinvoice.component.html',
  styleUrls: ['./arinvoice.component.css']
})

export class ARInvoiceComponent implements OnInit {
  arInvoiceForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.arInvoiceForm = fb.group({

      // poHeaderId: [],
    });
  }
  get f() { return this.arInvoiceForm.controls; }


  ngOnInit(): void {
  }
  arInvoice(arInvoiceForm){}
  closeMast() {
    this.router.navigate(['admin']);
  }
  clearFormArray() {
    window.location.reload();
  }
}
