import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';
import { PumpService } from 'src/app/pump/pump.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pump-dip-master-new',
  templateUrl: './pump-dip-master-new.component.html',
  styleUrls: ['./pump-dip-master-new.component.css']
})
export class PumpDipMasterNewComponent  {
  pumpIslandMasterForm: FormGroup;

  constructor(private fb: FormBuilder,private service: MasterService, private router: Router,private PumpService1: PumpService,private router1: ActivatedRoute) {
    this.pumpIslandMasterForm = fb.group({
      
    })
   }

  ngOnInit(): void {
  }

  pumpIslandMaster(pumpIslandMasterForm:any) {  }

}
