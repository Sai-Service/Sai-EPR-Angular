import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FixedAssetService } from '../../FixedAsset.service';
import { MasterService } from 'src/app/master/master.service';

interface IAssetRetirement
{
  AssetNo:number;
}
@Component({
  selector: 'app-fa-retirement',
  templateUrl: './fa-retirement.component.html',
  styleUrls: ['./fa-retirement.component.css']
})
export class FaRetirementComponent implements OnInit {
AssetRetirementForm:FormGroup;
AssetNo:number;

constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService,private service: MasterService) {
  this.AssetRetirementForm=fb.group({
    AssetNo:[],
  }) }
AssetRetirement(AssetRetirementForm:any){}
  ngOnInit(): void {
  }
  resetMast() {  window.location.reload();   }


  closeMast() {  this.router.navigate(['admin']);  }

}
