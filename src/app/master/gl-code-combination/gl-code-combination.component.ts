import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Url } from 'url';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasterService } from '../master.service';

interface IglCodeCombination {
  segmentName: string;
  segment1:string;
  segment2:string;
  segment3:string;
  segment4:string;
  segment5:string;
  accountType:string;
  detailPostingAllowedFlag:string;
  startDate:Date;
  endDate:Date;
  detailBudgetingAllowedFlag:string;
  codeCombinationId:Number;
  status:string;
  lookupValueDesc:string;

}

@Component({
  selector: 'app-gl-code-combination',
  templateUrl: './gl-code-combination.component.html',
  styleUrls: ['./gl-code-combination.component.css']
})

export class GlCodeCombinationComponent implements OnInit {
GlCodeCombinaionForm:FormGroup;
segmentName:string;
segment1:string;
segment2:string;
segment3:string;
segment4:string;
segment5:string;
accountType:string;
detailPostingAllowedFlag:string;
startDate:Date;
endDate:Date;
detailBudgetingAllowedFlag:string;
lookupValueDesc:string;
codeCombinationId:Number;
naturalaccount :any;
branch:any;
loc:any;
costCentre2 : any;
InterBranch3 :any;
status:string;
lstcomments:any[];
lookupValueDesc4:string;
lookupValueDesc1:string;
lookupValueDesc2:string;
lookupValueDesc3:string;
lookupValueDesc5:string;
lookupValue:any;

public branchList:Array<string>=[];
public locationList:Array<string>=[];
public costCentre:Array<string>=[];
public naturalAccount:Array<string>=[];
// public interBranch:Array<string>=[];
public interBranch:any[];
public statusList:Array<string>=[];
 public minDate = new Date();
  display = true;
 displayButton= true;


  constructor(private fb:FormBuilder,private service:MasterService,private router:Router) {
   this.GlCodeCombinaionForm=fb.group({
     segmentName:['',[Validators.required]],
     segment1:['',[Validators.required]],
     segment2:['',[Validators.required]],
     segment3:['',[Validators.required]],
     segment4:['',[Validators.required]],
     segment5:['',[Validators.required]],
     accountType:['',[Validators.required]],
     detailPostingAllowedFlag:['',[Validators.required]],
     startDate:['',[Validators.required]],
     endDate:['',[Validators.nullValidator]],
     detailBudgetingAllowedFlag:['',[Validators.required]],
     lookupValueDesc:['',[Validators.required]],
     codeCombinationId:[],
     status:['',[Validators.required]]
   });
   }

  ngOnInit(): void {
    this.service.branchlist().subscribe(
      data=>{
        this.branchList=data;
      
      }
          );
          this.service.locationlist().subscribe(
            data=>{
              this.locationList=data;
            }
          );
     this.service.costcentre().subscribe(
       data=>{this.costCentre=data;
      }
     );     
    this.service.naturalaccount().subscribe(
      data=>{
        this.naturalAccount=data;
      }
    );
    this.service.interbranch().subscribe(
      data=>{this.interBranch=data;
      }
    );
    this.status ="Active"; 
    this.service.statusList().subscribe(
      data=>{this.statusList=data;
      console.log(this.statusList)}
    );
  }
  GlCodeCombinaion(GlCodeCombinaionForm: any) {
  }
  GlCodeCombination(segment1,segment2,segment3,segment4,segment5)
  {
    // alert(segment1);
    
    const combination=segment1+'.'+segment2+'.'+segment3+'.'+segment4+'.'+segment5;
    this.segmentName=combination;
  }
  postingAllowedEvent(e){
    if(e.target.checked){
      this.detailPostingAllowedFlag='Y'
    }
    else{
      this.detailPostingAllowedFlag='N';
    }
  }
  budgetAllowedEvent(e){
    if(e.target.checked){
      this.detailBudgetingAllowedFlag='Y'
    }
    else{
      this.detailBudgetingAllowedFlag='N';
    }
  }
  closeglcodecombination()
  {
    this.router.navigate(['admin']);
  }
  resetglcodecombination()
  {
    window.location.reload();
  }

  transData(val)
  {
    return val;
  }

  onOptionsSelectedBranch(event:any)
  {
    var branch1=this.GlCodeCombinaionForm.get('segment1').value;
    // alert(branch1);
    this.service.getbranch(branch1).subscribe(
      data=>{this.branch=data;
        console.log(this.branch);
        this.GlCodeCombinaionForm.patchValue(this.branch);
        console.log(this.branch.lookupValueDesc);
        
        this.lookupValueDesc1  =this.branch.lookupValueDesc;
      }
    ); 

   }
 
   onOptionsSelectedlocation(event:any)
  {
    var loc1=this.GlCodeCombinaionForm.get('segment2').value;
    // alert(loc1);
    this.service.getloc(loc1).subscribe(
      data=>{this.loc=data;
        console.log(this.loc);
        this.GlCodeCombinaionForm.patchValue(this.loc);
        console.log(this.loc.lookupValueDesc);
        
        this.lookupValueDesc2  =this.loc.lookupValueDesc;
      }
    ); 

   }

   onOptionsSelectedcostCentre(event:any)
  {
    var costCentre1=this.GlCodeCombinaionForm.get('segment3').value;
    // alert(costCentre1);
    this.service.getcostCentre(costCentre1).subscribe(
      data=>{this.costCentre2=data;
        console.log(this.costCentre2);
        this.GlCodeCombinaionForm.patchValue(this.costCentre2);
        this.lookupValueDesc3  =this.costCentre2.lookupValueDesc;
      }
    ); 

   }ng
  onOptionsSelectedNatural(event:any)
  {
    var naturalAccount1=this.GlCodeCombinaionForm.get('segment4').value;
    // alert(naturalAccount1);
    this.service.getnaturalaccount(naturalAccount1).subscribe(
      data=>{this.naturalaccount=data;
        console.log(this.naturalaccount);
        this.GlCodeCombinaionForm.patchValue(this.naturalaccount);
        this.lookupValueDesc4  =this.naturalaccount.lookupValueDesc;
      }
    ); 

   }

   onOptionsSelectedInterBranch(event:any)
   {
     var InterBranch1=this.GlCodeCombinaionForm.get('segment5').value;
     var interBranch = this.interBranch
     let select1= this.interBranch.find(d=>d.interBranch.lookupValue===InterBranch1);     
    //  alert('lookupType'+select1);
     this.service.getInterBranch(InterBranch1).subscribe(
       data=>{this.InterBranch3=data;
         console.log(this.InterBranch3);
         this.GlCodeCombinaionForm.patchValue(this.InterBranch3);
         this.lookupValueDesc5  =this.InterBranch3.lookupValueDesc;
       }
     ); 
 
    }
  
 
   newMast(){
     const formValue:IglCodeCombination=this.GlCodeCombinaionForm.value;
     this.service.glCodeCombinationSubmit(formValue).subscribe((res:any)=>{
     if(res.code===200)
     {
       alert("Record inserted successfully");
       this.GlCodeCombinaionForm.reset();
     }
     else
     {
       if(res.code===400)
       {
         alert("Code already present in data base");
         this.GlCodeCombinaionForm.reset();
       }
     }
     });
   }
  searchMast(){
    this.service.getGlCodeCombinationSearch().subscribe(
      data => 
      {this.lstcomments=data;
        console.log(this.lstcomments);
      }
    );
  }
  
  Selectgl(codeCombinationId:Number){
    let select1= this.lstcomments.find(d=>d.codeCombinationId===codeCombinationId);
    this.GlCodeCombinaionForm.get('status').reset();
    if(select1)
    {
      this.GlCodeCombinaionForm.patchValue(select1);
      this.displayButton=false;
       this.display=false;

    }
    
  }
  updateMaster(){
    const formValue:IglCodeCombination=this.GlCodeCombinaionForm.value;
    this.service.UpdateGlMasterById(formValue).subscribe((res : any)=>{
      if(res.code===200)
      {
        alert("Record Updated Successfully");
        window.location.reload();
      }
      else
      {
        if (res.code===400)
        {
          alert("Error Occurred in Process");
          this.GlCodeCombinaionForm.reset();
        }
      }
    });
  }

}
