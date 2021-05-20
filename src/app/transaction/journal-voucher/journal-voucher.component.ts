import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ValueProvider } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';

interface IJournalVoucher{
  segmentName:string;
  codeCombinationId:number;
  // lineNumber:number;
  enteredDr:number;
  enteredCr:number;
  Branchname:string;

  periodName:String;
  runningTotalDr:number
  runningTotalCr:number;
  description:string;
  jeLineNum:number;
} 
@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css']
})


export class JournalVoucherComponent implements OnInit {
  JournalVoucherForm:FormGroup;
  segmentName:string;
  codeCombinationId:number;
  segment11:string;
  lookupValueDesc1:string;
  segment2:number;
  lookupValueDesc2:string;
  segment3:number;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  lookupValueDesc5:string;
  runningTotalDr:number;
  runningTotalCr:number;
  OUName:string;

  public InterBrancList:Array<string>=[];
  public BranchList:Array<string>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:Array<string>=[];
  public locIdList:Array<string>=[];
  public TypeList:Array<string>=[];
  public issueByList:Array<string>=[];
  public FinancialYear:any=[];
  branch:any;
  segmentNameList:any;

  showModal:boolean;
  title: string;
  content: number;
  userList2: any[] = [];
  lastkeydown1: number = 0;
  
  jeLineNum:number;
  enteredDr:number;
  enteredCr:number;
  description:string;

  periodName:string;
 
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.JournalVoucherForm=fb.group({

      segment11:[''],
      segment2:[''],
      segment3:[''],
      segment4:[''],
      lookupValueDesc1:[''],
      lookupValueDesc2:[''],
      lookupValueDesc3:[''],
      lookupValueDesc4:[''],
      segment5:[''],
      trans:[''],
      lookupValueDesc5:[''],
      periodName:[],
      OUName:[],
     
      glLines:this.fb.array([]),
      runningTotalDr:[],
      runningTotalCr:[],
    })
   }

   glLines():FormArray{
     return this.JournalVoucherForm.get("glLines") as FormArray
   }
   newglLines():FormGroup{
     return this.fb.group({
      jeLineNum:[],
      segmentName:[],
      codeCombinationId:[],
      enteredDr:[],
      enteredCr:[],
      description:[],
     
     })
   }

   addnewglLines(){
     this.glLines().push(this.newglLines());
     var len=this.glLines().length;
     var patch=this.JournalVoucherForm.get('glLines') as FormArray
     (patch.controls[len - 1]).patchValue(
      {
        jeLineNum: len,
      }
    );
  
     }

  ngOnInit(): void {

    this.OUName=(sessionStorage.getItem('ouName'));

    this.addnewglLines();
    var patch=this.JournalVoucherForm.get('glLines') as FormArray
     (patch.controls[0]).patchValue(
      {
        jeLineNum: 1,
      }
    );
  
    this.service.FinancialYear()
    .subscribe(
      data => {this.FinancialYear = data;
      }
      );
    this.service.BranchList()
    .subscribe(
      data => {
        this.BranchList = data;
        console.log(this.BranchList);
      }
    );
  this.service.CostCenterList()
    .subscribe(
      data => {
        this.CostCenterList = data;
        console.log(this.CostCenterList);
      }
    );
  this.service.NaturalAccountList()
    .subscribe(
      data => {
        this.NaturalAccountList = data;
        console.log(this.NaturalAccountList);
      }
    ); this.service.InterBrancList()
      .subscribe(
        data => {
          this.InterBrancList = data;
          console.log(this.InterBrancList);
        }
      );
      this.service.locationCodeList()
.subscribe(
 data => {
   this.locIdList = data;
   console.log(this.locIdList);
 }
);

  }
JournalVoucher(JournalVoucherForm:any){}

onOptionsSelectedBranch(segment: any, lType: string) {
  if(segment!=undefined)
  {var temp1 = segment.split('--');
  alert(temp1[0]);
var segment = temp1[0];}
  this.service.getInterBranch(segment, lType).subscribe(
    data => {
      this.branch = data;
      console.log(this.branch);
      if (this.branch != null) {
         if (lType === 'SS_Interbranch') {
          this.lookupValueDesc5 = this.branch.lookupValueDesc;
        }
        if (lType === 'NaturalAccount') {
          this.lookupValueDesc4 = this.branch.lookupValueDesc;
          }
        if (lType === 'CostCentre') {
          this.lookupValueDesc3 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Location') {
          this.lookupValueDesc2 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Branch') {
          this.lookupValueDesc1 = this.branch.lookupValueDesc;
        }
      }

    }
  );

    }

    fnCancatination(i)
    {
      var natacc1 =this.JournalVoucherForm.get('segment4').value.split('--');
      alert(natacc1[0]);
      var natacc=natacc1[0];
      this.segmentName=this.JournalVoucherForm.get('segment11').value+'.'+
                       this.JournalVoucherForm.get('segment2').value+'.'+
                       this.JournalVoucherForm.get('segment3').value+'.'+
                      //  this.JournalVoucherForm.get('segment4').value+'.'+
                      natacc+'.'+
                       this.JournalVoucherForm.get('segment5').value;

      // alert(this.segmentName);

      this.service.segmentNameList(this.segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            this.JournalVoucherForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)
            }
          } else if (this.segmentNameList.code === 400) {
            this.JournalVoucherForm.patchValue({segmentName:''});
            // alert(this.segmentNameList.message);

          }
        }
      );
      this.JournalVoucherForm.get('segment11').reset();
      this.JournalVoucherForm.get('segment2').reset();
      this.JournalVoucherForm.get('segment3').reset();
      this.JournalVoucherForm.get('segment4').reset();
      this.JournalVoucherForm.get('segment5').reset();

      this.JournalVoucherForm.get('lookupValueDesc1').reset();
      this.JournalVoucherForm.get('lookupValueDesc2').reset();
      this.JournalVoucherForm.get('lookupValueDesc3').reset();
      this.JournalVoucherForm.get('lookupValueDesc4').reset();
      this.JournalVoucherForm.get('lookupValueDesc5').reset();
    }

    openCodeCombination(i)
    {
      let SegmentName1=this.glLines().controls[i].get('segmentName').value;

      if(SegmentName1===null)
      {
        this.JournalVoucherForm.get('segment11').reset();
      this.JournalVoucherForm.get('segment2').reset();
      this.JournalVoucherForm.get('segment3').reset();
      this.JournalVoucherForm.get('segment4').reset();
      this.JournalVoucherForm.get('segment5').reset();

      this.JournalVoucherForm.get('lookupValueDesc1').reset();
      this.JournalVoucherForm.get('lookupValueDesc2').reset();
      this.JournalVoucherForm.get('lookupValueDesc3').reset();
      this.JournalVoucherForm.get('lookupValueDesc4').reset();
      this.JournalVoucherForm.get('lookupValueDesc5').reset();
     }
    if(SegmentName1!=null)
    {
      var temp = SegmentName1.split('.');
      // alert(temp[0]);
      this.segment11 = temp[0];
      this.segment2 = temp[1];
      this.segment3 = temp[2];
      this.segment4 = temp[3];
      this.segment5 = temp[4];
    }
    this.content = i;
    let a = i + 1
    this.title = "Account Code Combination :" + a;


    }

    getNaturalAccount($event)
    {
      let userId=(<HTMLInputElement>document.getElementById('NaturalAccountFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.NaturalAccountList, userId);
      }
    }
    }

    searchFromArray1(arr, regex) {
      let matches = [], i;
      for (i = 0; i < arr.length; i++) {
        if (arr[i].match(regex)) {
          matches.push(arr[i]);
        }
      }
      return matches;
    };

    removeglLines(glLineIndex){
      this.glLines().removeAt(glLineIndex);
      
    }
    creditTotalCal()
    {

      var arrayControl=this.JournalVoucherForm.get('glLines').value
      // this.JournalVoucherForm.get('runningTotalCr').value
      // alert(totalcr);
      this.runningTotalCr=0
          
      for(var i=0;i<arrayControl.length;i++)
      {
        // alert(arrayControl[i].enteredCr);
        this.runningTotalCr=this.runningTotalCr+Number(arrayControl[i].enteredCr);
      }
      this.JournalVoucherForm.patchValue({'runningTotalCr':this.runningTotalCr});

    }
    debitTotalCal()
    {
      var arrayControl=this.JournalVoucherForm.get('glLines').value
     this.runningTotalDr=0;
      
      for(var i=0;i<arrayControl.length;i++)
      {
       this.runningTotalDr=this.runningTotalDr+Number(arrayControl[i].enteredDr);
      }
      this.JournalVoucherForm.patchValue({'runningTotalDr':this.runningTotalDr});

    }
}
