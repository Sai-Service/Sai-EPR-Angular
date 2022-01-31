import { DatePipe, PathLocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ValueProvider } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';

interface IAccountEnquiry
{
  ledgerName:string;
  currencyCode:string;
  periodNameFrm:string;
  periodNameTo:string;
  segmentNameFrm:string;
  postedDate:string;
}

@Component({
  selector: 'app-account-enquiry',
  templateUrl: './account-enquiry.component.html',
  styleUrls: ['./account-enquiry.component.css']
})
export class AccountEnquiryComponent implements OnInit {
AccountEnquiryForm:FormGroup;
ledgerName:string='SS Ledger';
currencyCode:string='INR';
periodNameFrm:string;
enteredCr:number;
periodNameTo:string;
enteredDr:number;
 segment11:string;
  lookupValueDesc1:string;
  segment2:number;
  lookupValueDesc2:string;
  segment3:number;
  trans:string;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  lookupValueDesc5:string;
  segmentNameFrm:string;
public PeriodName:any;
public InterBrancList:Array<string>=[];
  public BranchList:Array<string>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:Array<string>=[];
  public locIdList:Array<string>=[];
  segmentNameList:any;
  codeCombinationId:number;
  branch:any;
  jeSource:string;
  name:string;
  jeCategory:string;
  // postedDate:Date;
  pipe = new DatePipe('en-US');
  periodName:string;
  now = new Date();
  postedDate = this.pipe.transform(this.now, 'dd-MMM-yyyy')


  showModal:boolean;
  JVdata: any;
  viewAccountingjvdata: any;
  runningTotalCr: number;
  runningTotalDr: number;
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService)  {
    this.AccountEnquiryForm=fb.group({
      runningTotalDr:[],
      runningTotalCr:[],
      ledgerName:[],
      jeCategory:[],
      postedDate:[],
      currencyCode:[],
      periodNameFrm:[],
      periodNameTo:[],
      segmentNameFrm:[],
      segment11:[''],
      periodName:[],
      segment2:[''],
      segment3:[''],
      // periodName:[],
      segment4:[''],
      lookupValueDesc1:[''],
      lookupValueDesc2:[''],
      lookupValueDesc3:[''],
      lookupValueDesc4:[''],
      segment5:[''],
      lookupValueDesc5:[''],
      jeSource:[],
      name:[],
      // codeCombinationId:[],
    })
   }
  AccountEnquiry(AccountEnquiryForm:any){}
  ngOnInit(): void {
    this.service.FinancialPeriod()
    .subscribe(
      data => {this.PeriodName = data.obj;
        console.log(this.PeriodName);
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

  openCodeCombination()
      {

        let SegmentName1=this.AccountEnquiryForm.get('segmentNameFrm').value;
        alert(SegmentName1);

        if(SegmentName1===null)
        {this.AccountEnquiryForm.get('segment11').reset();
        this.AccountEnquiryForm.get('segment2').reset();
        this.AccountEnquiryForm.get('segment3').reset();
        this.AccountEnquiryForm.get('segment4').reset();
        this.AccountEnquiryForm.get('segment5').reset();

        this.AccountEnquiryForm.get('lookupValueDesc1').reset();
        this.AccountEnquiryForm.get('lookupValueDesc2').reset();
        this.AccountEnquiryForm.get('lookupValueDesc3').reset();
        this.AccountEnquiryForm.get('lookupValueDesc4').reset();
        this.AccountEnquiryForm.get('lookupValueDesc5').reset();
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
        this.showModal = true;

      }
      fnCancatination()
      {
        this.segmentNameFrm=this.AccountEnquiryForm.get('segment11').value+'.'+
                         this.AccountEnquiryForm.get('segment2').value+'.'+
                         this.AccountEnquiryForm.get('segment3').value+'.'+
                         this.AccountEnquiryForm.get('segment4').value+'.'+
                         this.AccountEnquiryForm.get('segment5').value;

        alert(this.segmentNameFrm);

        this.service.segmentNameList(this.segmentNameFrm)
        .subscribe(
          data => {

            this.segmentNameList = data;
            if (this.segmentNameList.code === 200) {
              // this.AccountEnquiryForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
              if (this.segmentNameList.length == 0) {
                alert('Invalid Code Combination');
              } else {
                console.log(this.segmentNameList);
                this.codeCombinationId = Number(this.segmentNameList.codeCombinationId)

              }
            } else if (this.segmentNameList.code === 400) {
              this.AccountEnquiryForm.patchValue({segmentNameFrm:''});
              // alert(this.segmentNameList.message);

            }
          }
        );
        // this.AccountEnquiryForm.get('segment11').reset();
        // this.AccountEnquiryForm.get('segment2').reset();
        // this.AccountEnquiryForm.get('segment3').reset();
        // this.AccountEnquiryForm.get('segment4').reset();
        // this.AccountEnquiryForm.get('segment5').reset();

        // this.AccountEnquiryForm.get('lookupValueDesc1').reset();
        // this.AccountEnquiryForm.get('lookupValueDesc2').reset();
        // this.AccountEnquiryForm.get('lookupValueDesc3').reset();
        // this.AccountEnquiryForm.get('lookupValueDesc4').reset();
        // this.AccountEnquiryForm.get('lookupValueDesc5').reset();
      }
      onOptionsSelectedBranch(segment: any, lType: string) {

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

          showJournalDetail()
          {
            var formValue:IAccountEnquiry=this.AccountEnquiryForm.value;
            var postedDate = this.pipe.transform(formValue.postedDate, 'dd-MMM-yyyy');
            formValue.postedDate=postedDate;
            this.service.AccountEnquirySearch(formValue).subscribe
            ((res:any) => {
              if(res.code===200)
              {
                this.JVdata=res.obj;
              }
              else
          {
            if(res.code===400)
            {
              alert('ERROR OCCOURED IN PROCEESS');
              this.AccountEnquiryForm.reset();
            }
          }

          });
}

viewAccounting(event:any){
  alert(event);
  this.service.viewAccountingjv(event).subscribe((res: any) => {
    if (res.code === 200) {
      this.viewAccountingjvdata=res.obj;
      this.name=res.obj.name;
      this.periodName=res.obj.periodName;
      this.postedDate=res.obj.postedDate;
      this.jeCategory=res.obj.jeCategory;
      this.jeSource=res.obj.jeSource;
      this.runningTotalDr=res.obj.runningTotalDr.toFixed(2);
      this.runningTotalCr=res.obj.runningTotalCr.toFixed(2);
           this.viewAccountingjvdata=res.obj.glLines;
           for (let i; i<res.obj.glLines;i++){
            alert(res.obj.glLines[i]);
           }
            console.log(this.viewAccountingjvdata);
          alert(res.message);
        } else {
          if (res.code === 400) {
            alert(res.message);
          }
        }
      });
  }
  close() {
    this.router.navigate(['admin']);
  }

}

