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

interface IAssetCategories{

}

@Component({
  selector: 'app-asset-categories',
  templateUrl: './asset-categories.component.html',
  styleUrls: ['./asset-categories.component.css']
})
export class AssetCategoriesComponent implements OnInit {
AssetCategoriesForm:FormGroup;
categoryName:string;
catName:string;
categoryType:string;
ownedLeased:string;
enabledFlag:string;
capitalizeFlag:string;
inventorial:string;
bookTypeCode:string;
assetClearingAcct:number;
assetCostAcct:number;
deprnExpenseAcct:number;
bonusDeprnExpenceAcct:number;
bonusDeprnReserveAcct:number;
revalReserveAcct:number;
revalAmortizationAcct:number;
cipCostAcct:number;
cipClearingAcct;
unplanExpenseAcct:number;
endDate:Date;
startDate:Date;
prorateConventionCode:string;
retirementProrateConvention:string;
percentSalvageValue:number;
ceilingName:string;
deprnMethod:string;
basicRate:string;
adjustedRate:string;
bonusRule:string;
subcomponentLifeRule:string;
recongnizeGainLoss:string;
terminalGainLoss:string;
  lstcomment: any;

  constructor(private fb: FormBuilder, private router: Router, private fixedAssetservice:FixedAssetService) {
    this.AssetCategoriesForm=fb.group({
      categoryName:[],
      catName:[],
      categoryType:[],
      ownedLeased:[],
      enabledFlag:[],
      capitalizeFlag:[],
      inventorial:[],
      bookTypeCode:[],
      assetClearingAcct:[],
      assetCostAcct:[],
      deprnExpenseAcct:[],
      bonusDeprnExpenceAcct:[],
      bonusDeprnReserveAcct:[],
      revalReserveAcct:[],
      revalAmortizationAcct:[],
      cipCostAcct:[],
      cipClearingAcct:[],
      unplanExpenseAcct:[],
      startDate:[],
      endDate:[],
      prorateConventionCode:[],
      retirementProrateConvention:[],
      percentSalvageValue:[],
      ceilingName:[],
      deprnMethod:[],
      basicRate:[],
      adjustedRate:[],
      bonusRule:[],
      subcomponentLifeRule:[],
      recongnizeGainLoss:[],
      terminalGainLoss:[],
    })
   }
  AssetCategories(AssetCategoriesForm:any){}
  ngOnInit(): void {
  }
  resetMast() {  window.location.reload();   }

 
  closeMast() {  this.router.navigate(['admin']);  }
  
  search(catName){
    alert(catName+'ty');
    this.fixedAssetservice.getAssetCategories(catName).subscribe
    (data =>
     {
       console.log(data);
       this.lstcomment=data;
       console.log(this.lstcomment);
       this.AssetCategoriesForm.patchValue(this.lstcomment);
       this.AssetCategoriesForm.disable()  ;
     
     }
     );
  }
}
