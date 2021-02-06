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
recFagDiss=true;

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
     lookupValueDesc4:[],
lookupValueDesc1:[],
lookupValueDesc2:[],
lookupValueDesc3:[],
lookupValueDesc5:[],
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
    this.service.getnaturalaccount(segment4).subscribe(
      data=>{this.naturalaccount=data;
        console.log(this.naturalaccount);
        this.GlCodeCombinaionForm.patchValue(this.naturalaccount);
      this.accountType=this.naturalaccount.accountType;
      }
    );
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

  onOptionsSelectedBranch(segment:any, lType:string)
  {
    // alert(segment);
    // var InterBranch1=this.GlCodeCombinaionForm.get('segment1').value;
     this.service.getInterBranch(segment, lType).subscribe(
           data=>{this.branch=data;
             console.log(this.branch);
    if (this.branch != null) {
    //          this.GlCodeCombinaionForm.patchValue(this.branch);
    

    
    if(lType==='SS_Interbranch'){
       this.lookupValueDesc5  =this.branch.lookupValueDesc;
    }
     if(lType==='NaturalAccount'){      
        this.lookupValueDesc4  =this.branch.lookupValueDesc;
      //  this.accountType=this.branch.naturalAccount.accountType;
    //   // this.GlCodeCombinaionForm.patchValue(this.branch);
      //  this.accountType=this.branch.accountType;
      
      
     }
    if(lType==='CostCentre'){
      this.lookupValueDesc3  =this.branch.lookupValueDesc;
    }
    if(lType==='SS_Location'){
      this.lookupValueDesc2  =this.branch.lookupValueDesc;
    }
    if(lType==='SS_Branch'){
      this.lookupValueDesc1 =this.branch.lookupValueDesc;
    }
  }
   
        }
    ); 

   }
       
  onOptionsSelectedNatural(event:any)
  {
    var naturalAccount1=this.GlCodeCombinaionForm.get('segment4').value;
    alert(naturalAccount1);
    this.service.getnaturalaccount(naturalAccount1).subscribe(
      data=>{this.naturalaccount=data;
        console.log(this.naturalaccount);
        this.GlCodeCombinaionForm.patchValue(this.naturalaccount);
        this.accountType=this.naturalaccount.accountType;
        this.lookupValueDesc4  =this.naturalaccount.lookupValueDesc;
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
      if(select1.detailPostingAllowedFlag === 'N'){
      this.recFagDiss =true;
      }
      if(select1.detailPostingAllowedFlag === 'Y'){
        this.recFagDiss =false;
        }
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
