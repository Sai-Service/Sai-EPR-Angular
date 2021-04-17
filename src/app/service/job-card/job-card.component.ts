import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';

interface IpostPO {
  poHeaderId: number;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  jobcardForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.jobcardForm = fb.group({

      poHeaderId: [],
    })
  }

  ngOnInit(): void {
  }
  jobcard(jobcardForm){

  }
saveArInvoice(){}
  clearFormArray() {
    window.location.reload();
  }
  closeMast() {
    this.router.navigate(['admin']);
  }
}
