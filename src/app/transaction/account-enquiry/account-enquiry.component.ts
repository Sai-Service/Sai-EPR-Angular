import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service';


interface IAccountEnquiry
{
  ledgerName:string;
  currencyCode:string;
  periodNameFrm:string;
  periodNameTo:string;
  segmentNameFrm:string;
  segmentNameTo:string;
  postedDate:string;
  postedDateto:string;
  postedDatefrm:string;

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
segmentFrm1:string;
segmentTo1:string;
  lookupValueDesc1:string;
  segmentFrm2:number;
  segmentTo2:number
  lookupValueDesc2:string;
  segmentFrm3:number;
  segmentTo3:number;
  trans:string;
  lookupValueDesc3:string;
  segmentFrm4:number;
  segmentTo4:number;
  lookupValueDesc4:string;
  segmentFrm5:string;
  segmentTo5:string
  lookupValueDesc5:string;
  segmentNameFrm:string;
  segmentNameTo:string;
public PeriodName:any;
public InterBrancList:Array<string>=[];
  public BranchList:Array<string>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:Array<string>=[];
  public locIdList:Array<string>=[];
  segmentNameList:any;
  codeCombinationId:number;
  codeCombinationIdTo:number;
  branch:any;
  jeSource:string;
  name:string;
  jeCategory:string;
  postedDate:Date;
  pipe = new DatePipe('en-US');
  periodName:string;
  // now = new Date();
  // postedDate = this.pipe.transform('dd-MMM-yyyy')

  isVisible:Boolean=false;
  isouBalance:boolean=false;

  showModal:boolean;
  JVdata: any;
  viewAccountingjvdata: any;
  runningTotalCr: number;
  runningTotalDr: number;
  JVBaldata: any;
  postedDateto:string;
  postedDatefrm:string;
  min=new Date();
  max=new Date();

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
      segmentNameTo:[],
      segmentFrm1:[''],
      segmentTo1:[],
      periodName:[],
      segmentFrm2:[''],
      segmentTo2:[],
      segmentFrm3:[''],
      segmentTo3:[],
      // periodName:[],
      segmentFrm4:[''],
      segmentTo4:[],
      lookupValueDesc1:[''],
      lookupValueDesc2:[''],
      lookupValueDesc3:[''],
      lookupValueDesc4:[''],
      segmentFrm5:[''],
      segmentTo5:[],
      lookupValueDesc5:[''],
      jeSource:[],
      name:[],
      postedDateto:[],
  postedDatefrm:[],

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

  accType:string =''
  openCodeCombination( accType:string)
      {
        this.accType = accType;
        let SegmentName1=this.AccountEnquiryForm.get('segmentNameFrm').value;
        alert(SegmentName1);

        if(SegmentName1===null)
        {this.AccountEnquiryForm.get('segmentFrm1').reset();
        this.AccountEnquiryForm.get('segmentFrm2').reset();
        this.AccountEnquiryForm.get('segmentFrm3').reset();
        this.AccountEnquiryForm.get('segmentFrm4').reset();
        this.AccountEnquiryForm.get('segmentFrm5').reset();

        this.AccountEnquiryForm.get('lookupValueDesc1').reset();
        this.AccountEnquiryForm.get('lookupValueDesc2').reset();
        this.AccountEnquiryForm.get('lookupValueDesc3').reset();
        this.AccountEnquiryForm.get('lookupValueDesc4').reset();
        this.AccountEnquiryForm.get('lookupValueDesc5').reset();
      }
      // if(SegmentName1!=null)
      // {
      //   var temp = SegmentName1.split('.');
      //   // alert(temp[0]);
      //   this.segmentFrm1 = temp[0];
      //   this.segmentFrm2 = temp[1];
      //   this.segmentFrm3 = temp[2];
      //   this.segmentFrm4 = temp[3];
      //   this.segmentFrm5 = temp[4];
      // }
        this.showModal = true;

      }
      fnCancatination()
      {

        alert(this.accType);
        var segmentDtls :string =''
        if(this.accType === 'frmAcc'){
        this.segmentNameFrm=this.AccountEnquiryForm.get('segmentFrm1').value+'.'+
                         this.AccountEnquiryForm.get('segmentFrm2').value+'.'+
                         this.AccountEnquiryForm.get('segmentFrm3').value+'.'+
                         this.AccountEnquiryForm.get('segmentFrm4').value+'.'+
                         this.AccountEnquiryForm.get('segmentFrm5').value;

                         segmentDtls = this.segmentNameFrm;
                         alert(this.segmentNameFrm);
                         
        this.service.segmentNameList(segmentDtls)
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
                var temp = this.AccountEnquiryForm.get('segmentNameFrm').value.split('.');
                alert(temp[0]+''+temp[1]+''+temp[2]+''+temp[3]+''+temp[4]);
                this.segmentFrm1 = temp[0];
                //this.segmentFrm2 = Number(temp[1]);
                this.segmentFrm3 = Number(temp[2]);
                this.segmentFrm4 = Number(temp[3]);
                this.segmentFrm5 = temp[4];
                this.AccountEnquiryForm.patchValue({segmentFrm2: Number(temp[1])});
                // this.AccountEnquiryForm.patchValue({segmentNameFrm:''});

              }
            } else if (this.segmentNameList.code === 400) {
              this.AccountEnquiryForm.patchValue({segmentNameFrm:''});
             

            }
          }
        );
        }

        if(this.accType === 'toAcc'){
          this.segmentNameTo=this.AccountEnquiryForm.get('segmentFrm1').value+'.'+
                           this.AccountEnquiryForm.get('segmentFrm2').value+'.'+
                           this.AccountEnquiryForm.get('segmentFrm3').value+'.'+
                           this.AccountEnquiryForm.get('segmentFrm4').value+'.'+
                           this.AccountEnquiryForm.get('segmentFrm5').value;
  
                           segmentDtls = this.segmentNameTo;
                           alert(segmentDtls);

          

        this.service.segmentNameList(segmentDtls)
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
                var temp = segmentDtls.split('.');
                alert(temp[0]+'-'+temp[1]+'-'+temp[2]+'-'+temp[3]+'-'+temp[4]);
                this.segmentTo1 = temp[0];
                this.segmentTo2 = Number(temp[1]);
                this.segmentTo3 = Number(temp[2]);
                this.segmentTo4 = Number(temp[3]);
                this.segmentTo5 = temp[4];
                // this.AccountEnquiryForm.patchValue({segmentNameTo:''});

              }
            } else if (this.segmentNameList.code === 400) {
              this.AccountEnquiryForm.patchValue({segmentNameTo:''});
             

            }
          }
        );
        }
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
      openCodeCombinationTo()
      {

        let SegmentName1=this.AccountEnquiryForm.get('segmentNameTo').value;
        alert(SegmentName1);

        if(SegmentName1===null)
        {this.AccountEnquiryForm.get('segmentTo1').reset();
        this.AccountEnquiryForm.get('segmentTo2').reset();
        this.AccountEnquiryForm.get('segmentTo3').reset();
        this.AccountEnquiryForm.get('segmentTo4').reset();
        this.AccountEnquiryForm.get('segmentTo5').reset();

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
        this.segmentTo1 = temp[0];
        this.segmentTo2 = temp[1];
        this.segmentTo3 = temp[2];
        this.segmentTo4 = temp[3];
        this.segmentTo5 = temp[4];
      }
        this.showModal = true;

      }
      fnCancatinationTo()
      {
        this.segmentNameTo=this.AccountEnquiryForm.get('segmentTo1').value+'.'+
                         this.AccountEnquiryForm.get('segmentTo2').value+'.'+
                         this.AccountEnquiryForm.get('segmentTo3').value+'.'+
                         this.AccountEnquiryForm.get('segmentTo4').value+'.'+
                         this.AccountEnquiryForm.get('segmentTo5').value;

        alert(this.segmentNameTo);

        this.service.segmentNameList(this.segmentNameTo)
        .subscribe(
          data => {

            this.segmentNameList = data;
            if (this.segmentNameList.code === 200) {
              // this.AccountEnquiryForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
              if (this.segmentNameList.length == 0) {
                alert('Invalid Code Combination');
              } else {
                console.log(this.segmentNameList);
                this.codeCombinationIdTo = Number(this.segmentNameList.codeCombinationId)

              }
            } else if (this.segmentNameList.code === 400) {
              this.AccountEnquiryForm.patchValue({segmentNameTo:''});
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
            var postedDatefrm = this.pipe.transform(formValue.postedDatefrm, 'dd-MMM-yyyy');
            var postedDateto = this.pipe.transform(formValue.postedDateto, 'dd-MMM-yyyy');
            formValue.postedDatefrm=postedDatefrm;
            formValue.postedDateto=postedDateto;
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
        this.isVisible=true;
        this.isouBalance=false;  
        }

showBalDetail()
{
  var formValue:IAccountEnquiry=this.AccountEnquiryForm.value;
  var postedDate = this.pipe.transform(formValue.postedDate, 'dd-MMM-yyyy');
  formValue.postedDate=postedDate;
  this.service.AccountBalSearch(formValue).subscribe
  ((res:any) => {
    if(res.code===200)
    {
      this.JVBaldata=res.obj;
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
this.isVisible=false;
        this.isouBalance=true;  
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

  onOptionGlPeriod(event){

    var selPer=this.PeriodName.find(d=>d.periodName===event);
    console.log(selPer.startDate)
    if(selPer!=undefined){
   (document.getElementById('postedDatefrm') as HTMLInputElement).setAttribute('min',selPer.startDate);
   (document.getElementById('postedDatefrm') as HTMLInputElement).setAttribute('max',selPer.endDate);
   
  //  (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('min',selPer.startDate);
  //  (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('max',selPer.endDate);
 }
  }
  onOptiontoPeriod(event){

    var selPer=this.PeriodName.find(d=>d.periodName===event);
    console.log(selPer.startDate)
    if(selPer!=undefined){
      alert(selPer.startDate+'---'+selPer.endDate);
   (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('min',selPer.startDate);
   (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('max',selPer.endDate);
   
  //  (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('min',selPer.startDate);
  //  (document.getElementById('postedDateto') as HTMLInputElement).setAttribute('max',selPer.endDate);
 }
  }
}

