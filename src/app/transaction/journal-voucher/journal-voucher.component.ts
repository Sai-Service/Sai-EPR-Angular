import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
 import { MasterService } from 'src/app/master/master.service';
// import { min } from 'moment';
// import { formatDate } from '@angular/common'


interface IJournalVoucher{
  segmentName:string;
  codeCombinationId:number;
  docSeqValue:number;
  postedDate:string;
  emplId:number;
  // lineNumber:number;
  enteredDr:number;
  enteredCr:number;
  status:string;
  ouId:number;
  Branchname:string;
  jeCategory:string;
  jeSource:string;
  name:string;

  reversalPeriod:string;
  reversalDate:Date;

  periodName:String;
  runningTotalDr:number
  runningTotalCr:number;
  description:string;
  jeLineNum:number;
  docSeqVal1:number;
  lineStatus:string;
  // ssLineStatus:string;

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
  docSeqVal:number;
  docSeqValue:number;
  docSeqVal1:number;
  segment11:string;
  lookupValueDesc1:string;
  segment2:number;
  postedDate :string;
  lookupValueDesc2:string;
  segment3:number;
  lookupValueDesc3:string;
  segment4:number;
  lookupValueDesc4:string;
  segment5:string;
  docseqdata:any;
  lookupValueDesc5:string;
  runningTotalDr:number;
  runningTotalCr:number;
  OUName:string;
  ouId:number;
  public status:string="Incomplete";
  jeSource:string;
  name:string;
  emplId:number;
  ssLineStatus:any;

  reversalPeriod:string;
  reversalDate:Date;

  public InterBrancList:Array<string>=[];
  public BranchList:Array<any>=[];
  public CostCenterList:Array<string>=[];
  public NaturalAccountList:any=[];
  public locIdList:Array<any>=[];
  public TypeList:Array<string>=[];
  public issueByList:Array<string>=[];
  public FinancialYear:any=[];
  public JournalType:any=[]; 
  branch:any;
  segmentNameList:any;
  jeCategory:string;

  isVisible16: boolean = false;
  isVisicod:boolean=false;
  displayRemoveRow: Array<boolean> = [];
  displaycodeCombination:Array<boolean>=[];
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
  public PeriodName:any;

  pipe = new DatePipe('en-US');
  now = Date.now();

  @ViewChild("perName") perName: ElementRef;
  displayaddButton: boolean;
  divId: number;
  private sub: any;
  ngAfterViewInit() {
    this.perName.nativeElement.focus();
  }

  duplicateLineItem=false;
  min=new Date();
  lineStatus:string;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService,private router1: ActivatedRoute) {
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
      docSeqVal:[],
      lookupValueDesc5:[''],
      periodName:[],
      OUName:[],
      postedDate:[],
      docSeqVal1:[],
      docSeqValue:[],
      status:[],
      ouId:[],
      emplId:[],
      jeCategory:[],
      jeSource:[],
      name:[],
      reversalPeriod:[],
      reversalDate:[],

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
      lineStatus:[],
      
     })
   }

   addnewglLines(i:number){
    //  alert(i+'Index');
    //  var cramt=this.JournalVoucherForm.get('segmentName').value;
    if(i>-1){
      // alert('inside IF');
      var trxLnArr1 = this.JournalVoucherForm.get('glLines').value;
      console.log(trxLnArr1);
      // console.log(trxArr1[i].segmentName);
      //
      // alert(trxLnArr1[i].segmentName);
        var segName=trxLnArr1[i].segmentName;
        var drAmt=trxLnArr1[i].enteredDr;
        var crAmt=trxLnArr1[i].enteredDr;
        // alert(drAmt+'Amt'+crAmt);
        if(segName===null&&(drAmt===null || crAmt===null))
       { alert('Please enter Blank Data');
       return;
    }
      }
      var len1 = this.glLines().length;
      // alert(len1+'Length'+i);
      if(len1==i+1){
     this.glLines().push(this.newglLines());
     var len=this.glLines().length;
     var patch=this.JournalVoucherForm.get('glLines') as FormArray
     (patch.controls[len - 1]).patchValue(
      {
        jeLineNum: len,
        lineStatus:'BOOKED',
      }
    );
    var btnrm =document.getElementById("btnrm"+(i-1)) as HTMLInputElement;
    if(document.contains(btnrm)){
   (document.getElementById("btnrm"+(i-1)) as HTMLInputElement).disabled = false;
   // (document.getElementById('btnrm'+i+1) as HTMLInputElement).disabled = true;
   }}
   this.displayRemoveRow.push(true);
   this.displaycodeCombination.push(true);
     }
     removeglLines(glLineIndex){
      var len1=this.glLines().length;
      if(len1===1){
        alert('You can not delete the line');
        return;}
      this.glLines().removeAt(glLineIndex);
      var len=this.glLines().length;
      var patch=this.JournalVoucherForm.get('glLines') as FormArray
      (patch.controls[len - 1]).patchValue(
       {
         jeLineNum: len,
       }
     );
     var btnrm =document.getElementById("btnRm"+glLineIndex) as HTMLInputElement;
     if(document.contains(btnrm)){
    (document.getElementById("btnRm"+glLineIndex) as HTMLInputElement).disabled = true;
    }
  }

  ngOnInit(): void {

    this.OUName=(sessionStorage.getItem('ouName'));
    this.ouId=Number((sessionStorage.getItem('ouId')));
    // alert('OrgID'+this.ouId);
    this.emplId=Number((sessionStorage.getItem('emplId')));
    this.divId=Number(sessionStorage.getItem('divisionId'));
    (document.getElementById("btnRev") as HTMLInputElement).disabled = true;
    (document.getElementById("btnUpdate") as HTMLInputElement).disabled = true;
    (document.getElementById("btnCancel") as HTMLInputElement).disabled = true;
    
    this.isVisicod=true;
    
    // alert('employee'+this.emplId);

    // this.JournalVoucherForm.controls.postedDate.setValue(formatDate(this.postedDate,'yyyy-MM-dd','en'));
    this.addnewglLines(-1);
    var patch=this.JournalVoucherForm.get('glLines') as FormArray
     (patch.controls[0]).patchValue(
      {
        jeLineNum: 1,
      }
    );

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
    this.service.lineStatus()
    .subscribe(
      data => {
        this.ssLineStatus = data;
        console.log(this.BranchList);
      }
    );
    this.service.JournalType().subscribe(
      data=>{this.JournalType=data;
      }
    );
  this.service.CostCenterList()
    .subscribe(
      data => {
        this.CostCenterList = data;
        console.log(this.CostCenterList);
      }
    );
  this.service.NaturalAccountListJV()
    .subscribe(
      data => {
        this.NaturalAccountList = data.obj;
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
this.JournalVoucherForm.get('reversalPeriod').disable();
this.JournalVoucherForm.get('reversalDate').disable();
if(this.docSeqValue!=null && this.status=='INCOMPLETE'){
  (document.getElementById("btnUpdate") as HTMLInputElement).disabled = true;
  (document.getElementById("btnCancel") as HTMLInputElement).disabled = true;
  
}
else{
(document.getElementById("btnUpdate") as HTMLInputElement).disabled = false;
(document.getElementById("btnCancel") as HTMLInputElement).disabled = false;
}
this.glLines().controls[0].patchValue({ lineStatus: 'BOOKED' });
// for(i=0;i<i<this.glLines().length;i++)
this.displaycodeCombination[0]=true;


  this.sub = this.router1.params.subscribe(params => {
     var jvNum = params['docSequenceValue'];
    if (jvNum != undefined){
    // this.docSeqVal1=jvNum
    this.search(jvNum);}
});


  }
JournalVoucher(JournalVoucherForm:any){}

onOptionsSelectedBranch(segment: any, lType: string) {
  if(segment!=undefined)
  {var temp1 = segment.split('--');
  // alert(temp1[0]);
var segment = temp1[0];}
  this.service.getInterBranch(segment, lType).subscribe(
    data => {
      this.branch = data;
      console.log(this.branch);
      if (this.branch != null) {
         if (lType === 'SS_Interbranch') {
          this.lookupValueDesc5 = this.branch.lookupValueDesc;
        }
        // if (lType === 'NaturalAccount') {
        //   this.lookupValueDesc4 = this.branch.lookupValueDesc;
        //   }
        if (lType === 'CostCentre') {
          this.lookupValueDesc3 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Location') {
          this.lookupValueDesc2 = this.branch.lookupValueDesc;
        }
        if (lType === 'SS_Branch') {
          this.lookupValueDesc1 = this.branch.lookupValueDesc;
          var sellBr= this.BranchList.find(d => d.lookupValue === segment);           
            this.locIdList = this.locIdList.filter((br => br.lookupValue.includes(sellBr.parentValue) ||br.lookupValue === "000"));

        }
      }

    }
  );

    }

    fnCancatination(i)
    {
      var Code=this.JournalVoucherForm.get('glLines').value;
      var patch =this.JournalVoucherForm.get('glLines') as FormArray;
      var natacc1 =this.JournalVoucherForm.get('segment4').value.split('--');
      // alert(natacc1[0]);
      var natacc=natacc1[0];
      Code[i].segmentName=this.JournalVoucherForm.get('segment11').value+'.'+
                          this.JournalVoucherForm.get('segment2').value+'.'+
                          this.JournalVoucherForm.get('segment3').value+'.'+
                      //  this.JournalVoucherForm.get('segment4').value+'.'+
                          natacc+'.'+
                          this.JournalVoucherForm.get('segment5').value;

      // alert(this.segmentName);
      var segmentName=Code[i].segmentName;
      // alert(segmentName+"before patch");
      patch.controls[i].patchValue({'segmentName':segmentName});
      // alert(segmentName+"after patch");
      this.service.segmentNameList(segmentName)
      .subscribe(
        data => {

          this.segmentNameList = data;
          if (this.segmentNameList.code === 200) {
            this.JournalVoucherForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
            this.codeCombinationId=this.segmentNameList.obj.codeCombinationId;
            alert(this.codeCombinationId +'inside fnca');
            this.CheckForDuplicateLineItem(this.codeCombinationId,i);
            if(this.duplicateLineItem ==false) {

              this.codeCombinationId = this.codeCombinationId;

                }
            if (this.segmentNameList.length == 0) {
              alert('Invalid Code Combination');
            } else {
              console.log(this.segmentNameList);
              this.JournalVoucherForm.patchValue({codeCombinationId:this.segmentNameList.obj.codeCombinationId});
              this.codeCombinationId = Number(this.segmentNameList.obj.codeCombinationId);
              this.CheckForDuplicateLineItem(this.codeCombinationId,i);
              // if(this.duplicateLineItem ==false) {

              //   this.codeCombinationId = this.codeCombinationId;

              //     }
            }
            // this.CheckForDuplicateLineItem(this.codeCombinationId,i);

          } else if (this.segmentNameList.code === 400) {
            // var arraycontrol =this.JournalVoucherForm.get('glLines').value;
            patch.controls[i].patchValue({segmentName : ''});
            // alert(this.segmentNameList.message);

          }
        }
      );
      // this.JournalVoucherForm.get('segment11').reset();
      // this.JournalVoucherForm.get('segment2').reset();
      // this.JournalVoucherForm.get('segment3').reset();
      // this.JournalVoucherForm.get('segment4').reset();
      // this.JournalVoucherForm.get('segment5').reset();

      // this.JournalVoucherForm.get('lookupValueDesc1').reset();
      // this.JournalVoucherForm.get('lookupValueDesc2').reset();
      // this.JournalVoucherForm.get('lookupValueDesc3').reset();
      // this.JournalVoucherForm.get('lookupValueDesc4').reset();
      // this.JournalVoucherForm.get('lookupValueDesc5').reset();
      // // alert('Code Combination search complete')
    }

    openCodeCombination(i)
    {
      var natacc1 =this.JournalVoucherForm.get('segment4').value.split('--');
      // alert(natacc1[0]);
      var natacc=natacc1[0];

      let SegmentName1=this.glLines().controls[i].get('segmentName').value;

      if(SegmentName1===null)
      {
       this.JournalVoucherForm.get('segment11').reset();
       var branchNM = sessionStorage.getItem('locCode').split('.');
       this.BranchList = this.BranchList.filter((br => br.lookupValue === branchNM[0]));
       //  / this.BranchList = this.BranchList.filter();
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
      // natacc=temp[3];
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
        // alert(arr[i]+'Array i');
        if (arr[i].match(regex)) {
          matches.push(arr[i]);
        }
      }
      return matches;
    };


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

    postGl()
    {
      var totcr=this.JournalVoucherForm.get('runningTotalCr').value;
      var totdr=this.JournalVoucherForm.get('runningTotalDr').value;

      if(totcr===totdr)
      {
        const formValue:IJournalVoucher=this.JournalVoucherForm.value;
        console.log(formValue);
        this.service.glPost(formValue).subscribe((res:any)=>{
          if(res.code===200)
          {
            alert("GL Lines Details Posted Successfully");
            console.log(res.obj);
            this.docSeqValue=res.obj.DocSeqValue;
            this.status=res.obj.Status;
            this.JournalVoucherForm.disable();
            (document.getElementById("btnPost") as HTMLInputElement).disabled = true;
            (document.getElementById("btnSave") as HTMLInputElement).disabled = true;
            // this.displayaddButton=false;
           var len= this.JournalVoucherForm.get('glLines')as FormArray;
            // var len=this.glLines.length;
            // alert(len.length);
            for(var i=0;i<len.length;i++){
              // alert('For Loop'+i);
              // var btnrm =document.getElementById("btnrm"+i) as HTMLInputElement;
            (document.getElementById("btnAdd"+i) as HTMLInputElement).disabled = true;
            (document.getElementById("btnRm"+i) as HTMLInputElement).disabled = true;
            }
          }
          else
         {
            if (res.code === 400)
            {
              alert("Code already present in data base");
              this.JournalVoucherForm.reset();
            }
          }
       })
      }
      else{
        alert("Can not do Posting because total credit and debit values are not matching");
      }
    }

    saveGl()
    {
        const formValue:IJournalVoucher=this.JournalVoucherForm.value;
        this.service.glSave(formValue).subscribe((res:any)=>{
          if(res.code===200)
          {
            alert("Record inserted Successfully");
            console.log(res.obj);
            this.docSeqValue=res.obj;
            // this.JournalVoucherForm.disable();
            (document.getElementById("btnSave") as HTMLInputElement).disabled = false;
            (document.getElementById("btnUpdate") as HTMLInputElement).disabled = true;
            (document.getElementById("btnCancel") as HTMLInputElement).disabled = true;
          }
          else
         {
            if (res.code === 400)
            {
              alert("Code already present in data base");
              this.JournalVoucherForm.reset();
            }
          }
       })
}

copyGl()
{
    const formValue:IJournalVoucher=this.JournalVoucherForm.getRawValue();
    this.service.glCopy(formValue).subscribe((res:any)=>{
      if(res.code===200)
      {
        alert("Record copied Successfully");
        console.log(res.obj);
        this.docSeqValue=res.obj;
        // this.JournalVoucherForm.disable();
      }
      else
     {
        if (res.code === 400)
        {
          alert("Code already present in data base");
          this.JournalVoucherForm.reset();
        }
      }
   })
}

    search(docSeqVal1){
      this.glLines().clear();
     // var docseq1=this.JournalVoucherForm.get('docSeqVal1').value;
      // alert(docseq1);
      this.service.SerchBydocseqval(docSeqVal1).subscribe
      (data =>
       {
         console.log(data);
         if(data.code === 400){
          //  alert(data.message);
          // window.location.reload();
         }
         if(data.code===200)
         {
           this.docseqdata=data.obj;
           let control=this.JournalVoucherForm.get('glLines') as FormArray;
          //  data.obj.glLines.forEach(f =>
            for (let i = 0; i < data.obj.glLines.length; i++) 
           
            {
             var trxList:FormGroup=this.newglLines();
             this.glLines().push(trxList);
             this.displayRemoveRow[i]=false;

           }
           this.JournalVoucherForm.patchValue(data.obj);
           this.JournalVoucherForm.patchValue({periodName:data.obj.periodName});
           this.JournalVoucherForm.patchValue({runningTotalCr:data.obj.runningTotalCr});
           this.JournalVoucherForm.patchValue({runningTotalDr:data.obj.runningTotalDr});
           this.JournalVoucherForm.patchValue({jeCategory:data.obj.jeSource});

           this.JournalVoucherForm.patchValue(data.obj.glLines);
           this.JournalVoucherForm.patchValue({emplId:sessionStorage.getItem('emplId')})
          // for (let i = 0; i < data.obj.glLines().length; i++) {

          //  this.JournalVoucherForm.get('trxLinesList').patchValue(data.obj.glLines);
          // }
          if(data.obj.status==='INCOMPLETE')
          {
            (document.getElementById("btnRev") as HTMLInputElement).disabled = true;
            

          }
          if(data.obj.status==='INCOMPLETE' && data.obj.docSeqValue!=null)
          {
            (document.getElementById("btnSave") as HTMLInputElement).disabled = true;
            (document.getElementById("btnCancel") as HTMLInputElement).disabled = false;
            
            

          }
          for (let i = 0; i<data.obj.glLines.length; i++) {
            // alert(data.obj.glLines[i].lineStatus)
          if(data.obj.glLines[i].lineStatus =='CANCELLED'){
            // alert(data.obj.glLines[i].lineStatus)
              control.controls[i].get('lineStatus').disable();
              control.controls[i].get('enteredDr').disable();
              control.controls[i].get('enteredCr').disable();
              control.controls[i].get('description').disable();
              // this.isVisicod=false;
              this.displaycodeCombination[i]=false;
          }
          else {
            control.controls[i].get('lineStatus').enable();
            control.controls[i].get('enteredDr').enable();
            control.controls[i].get('enteredCr').enable();
            control.controls[i].get('description').enable();
            // this.isVisicod=false;
            this.displaycodeCombination[i]=true;
          }
        }
          if(data.obj.status==='POST')
          {
            this.JournalVoucherForm.disable();
            // this.JournalVoucherForm.get('glLines').disable();
            // this.JournalVoucherForm.get('glLines').get('segmentName').disable();


            (document.getElementById("btnSave") as HTMLInputElement).disabled = true;
            (document.getElementById("btnPost") as HTMLInputElement).disabled = true;
            (document.getElementById("btnCancel") as HTMLInputElement).disabled = true;
             this.JournalVoucherForm.get('reversalPeriod').enable();
              this.JournalVoucherForm.get('reversalDate').enable();
              (document.getElementById("btnRev") as HTMLInputElement).disabled = false;

                var len= this.JournalVoucherForm.get('glLines')as FormArray;
            // // var len=this.glLines.length;
            // // alert(len.length);
            for(var i=0;i<len.length;i++){
              // alert('For Loop'+i);
            //   // var btnrm =document.getElementById("btnrm"+i) as HTMLInputElement;
            (document.getElementById("btnAdd"+i) as HTMLInputElement).disabled = true;
            // (document.getElementById("btnRm"+i) as HTMLInputElement).disabled = true;
            }
            }



         }
       }
       );
      //  this.emplId=Number((sessionStorage.getItem('emplId')));
    }
    reverseGl()
{
    // alert("Hello");
    const formValue:IJournalVoucher=this.JournalVoucherForm.getRawValue();
    var stat=this.JournalVoucherForm.get('status').value;
    if(stat=="POST")
    {
    this.service.glReverse(formValue).subscribe((res:any)=>{
      if(res.code===200)
      {
        alert("Record Reversed Successfully");
        console.log(res.obj);
        this.docSeqValue=res.obj.DocSeqValue;
        this.status=res.obj.Status;
        this.search(res.obj.DocSeqValue);

        // this.status
        this.JournalVoucherForm.disable();
      }
      else
     {
        if (res.code === 400)
        {
          alert("Code already present in data base");
          this.JournalVoucherForm.reset();
        }
      }
   })
}

else
{
  alert("JV Status is not POST So,you can not reverse the JV");
}
    }
    updateGl()
{
  const formValue:IJournalVoucher=this.JournalVoucherForm.value;
  this.service.glUpdate(formValue).subscribe((res:any)=>{
    if(res.code===200)
    {
      alert("Record updated Successfully");
      console.log(res.obj);
      this.docSeqValue=res.obj;
      (document.getElementById("btnUpdate") as HTMLInputElement).disabled = true;
      // this.JournalVoucherForm.disable();
    }
    else
   {
      if (res.code === 400)
      {
        alert("Code already present in data base");
        this.JournalVoucherForm.reset();
      }
    }
 })
}
cancelGl(){
  const formValue:IJournalVoucher=this.JournalVoucherForm.value;
  this.service.glUpdateStatus(formValue,formValue.docSeqValue  ).subscribe((res:any)=>{
    if(res.code===200)
    {
      alert("Record updated Successfully");
      console.log(res.obj);
      this.docSeqValue=res.obj;
      (document.getElementById("btnCancel") as HTMLInputElement).disabled = false;
      this.JournalVoucherForm.disable();
    }
    else
   {
      if (res.code === 400)
      {
        alert("Code already present in data base");
        this.JournalVoucherForm.reset();
      }
    }
 })
}
    onOptionGlPeriod(event){

       var selPer=this.PeriodName.find(d=>d.periodName===event);
       if(selPer!=undefined){
      (document.getElementById('postedDate') as HTMLInputElement).setAttribute('min',selPer.startDate);
      (document.getElementById('postedDate') as HTMLInputElement).setAttribute('max',selPer.endDate);
    }
  }
  OnSelectJournalType(event:any){
    // alert(event);
    this.JournalVoucherForm.patchValue({'jeSource':event});
  }
    resetJv()
    {
      window.location.reload();
    }

    close(){
      this.router.navigate(['admin']);
      }

      CheckForDuplicateLineItem(codeCombId,i){
        // alert(codeCombId+'code in func'+i);
        var glcombArr = this.JournalVoucherForm.get('glLines').value;
        var patch = this.JournalVoucherForm.get('glLines') as FormArray;
        var len1=glcombArr.length;
        // alert("line item array length :"+len1 + "," +codeCombId);

        for (let j = 0; j < len1 ; j++)
          {
            // alert("inside for loop");
            var lineCombinationId=glcombArr[j].codeCombinationId;
            // alert(lineCombinationId);
             if(i != j) {
              //  alert('Inside 1st If');

             if (lineCombinationId===codeCombId ) {
               this.duplicateLineItem=true;
               alert(lineCombinationId+" DUPLICATE line item. Please check  item  in Line - " +(j+1));
               patch.controls[i].patchValue({segmentName:'',codeCombinationId:''});
               return;
              }

              }else{this.duplicateLineItem=false;}

               this.duplicateLineItem=false;
          }


      }


    
  }
