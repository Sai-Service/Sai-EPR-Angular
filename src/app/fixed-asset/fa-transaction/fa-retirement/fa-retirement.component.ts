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
  assetId:number;
  referenceNum:number;
  bookTypeCode:string;
  dateRetired:Date;
  status:string;
  units:number;
}
@Component({
  selector: 'app-fa-retirement',
  templateUrl: './fa-retirement.component.html',
  styleUrls: ['./fa-retirement.component.css']
})
export class FaRetirementComponent implements OnInit {
AssetRetirementForm:FormGroup;
AssetNo:number;
assetId:number;
referenceNum:number;
bookTypeCode:string;
dateRetired:Date;
status:string;
units:number;
retirementTypeCode:string;
retirementProrateConvention:string;
costRetired:number;
proceedsOfSale:number;
revalReserveRetired:number;
soldTo:string;
  lstcomment: any;
  retireTypeList: any;
  nbvRetired:number;
  unitsRetire:number;
  arInvNo:number;
  customerNo:number;
  emplId:number;

constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService,private service: MasterService) {
  this.AssetRetirementForm=fb.group({
    AssetNo:[],
    assetId:[],
    referenceNum:[],
    bookTypeCode:[],
    dateRetired:[],
    status:[],
    units:[],
    retirementTypeCode:[],
    retirementProrateConvention:[],
    costRetired:[],
    proceedsOfSale:[],
    revalReserveRetired:[],
    soldTo:[],
    nbvRetired:[],
    unitsRetire:[],
    arInvNo:[],
    customerNo:[],
    emplId:[],
  }) }
AssetRetirement(AssetRetirementForm:any){}
  ngOnInit(): void {
    this.emplId=Number(sessionStorage.getItem('emplId'));
    alert(this.emplId);
    this.fixedAssetservice.RetireTypeCode()
    .subscribe(
      data => {
        this.retireTypeList = data;
      }
    );
  }

  resetMast() {  window.location.reload();   }


  closeMast() {  this.router.navigate(['admin']);  }

  search(AssetNo){
    // alert(assNumber+'ty');
    this.fixedAssetservice.getAssetRetirementSearch(AssetNo).subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.AssetRetirementForm.patchValue(this.lstcomment);
        // this.AssetRetirementForm.disable()  ;

     }
     );

}
assRetirementSave()
  {
         const formValue:IAssetRetirement=this.AssetRetirementForm.value;
      this.fixedAssetservice.assRetirePost(formValue).subscribe((res:any)=>{
        if(res.code===200)
        {
          alert("Asset Retirement Done Successfully");
          console.log(res.obj);
          
          // this.assRetirementSave.patchValue({'assetNumber':res.obj})
          // this.AssetAdditionForm.disable();
        }
        else
       {
          if (res.code === 400) 
          {
            alert("Code already present in data base");
            // this.AssetAdditionForm.reset();
          }
        }
     })
    }

}
