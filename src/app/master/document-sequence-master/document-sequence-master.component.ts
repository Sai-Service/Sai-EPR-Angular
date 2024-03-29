import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';


interface IserialMaster {
  docSrlId: number;
  docSrlNo: number;
  deptId: string;
  divisionId: number;
  recvTypeId: number;
  financialYear: number;
  docSrlPrefix: string;
  status: string
  docSrlType: string;
  docSrlOu: number;
  docSrlLoc: any;
  startDate: Date;
  endDate: Date
}

@Component({
  selector: 'app-document-sequence-master',
  templateUrl: './document-sequence-master.component.html',
  styleUrls: ['./document-sequence-master.component.css']
})
export class DocumentSequenceMasterComponent implements OnInit {
  DocSeriealMasterForm: FormGroup;

  pipe = new DatePipe('en-US');
  submitted = false;
  docSrlId: number;
  docSrlNo: number;
  deptId: string;
  divisionId: number;
  recvTypeId: number;
  financialYear: number;
  docSrlPrefix: string;
  docSrlType: string;
  docSrlOu: number;
  docSrlLoc: any;
  // startDate: Date;
  startDate=this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate: Date;
  organizationCode:any;
  tySrlNo:number;
  attribute1:string;
  public status = "Active";
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  lstcomments: any[];
  display = true;
  trandistype =true;
  displayButton = true;
  public minDate = new Date();
  public statusList: Array<string> = [];
  public recvTypeIdList: Array<string> = [];
  public DepartmentList: any [];
  public locIdList: any[];
  public DivisionIDList: Array<string> = [];
  public ouIdList: Array<string>[];
  public FinancialYear:Array<string>=[];
  public docTypeList:Array<string>=[];
  public transtype:any[];
  // public tySrlNo:any[];

  activeTab = 'search';

  search(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
  }
  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.DocSeriealMasterForm = fb.group({
      docSrlId: [''],
      docSrlNo: [''],
      deptId: ['', [Validators.required]],
      divisionId: ['', [Validators.required]],
      recvTypeId: ['', [Validators.required]],
      financialYear: ['', [Validators.required]],
      docSrlPrefix: ['', [Validators.required]],
      status: ['', [Validators.required]],
      docSrlType: ['', [Validators.required]],
      docSrlOu: ['', [Validators.required]],
      docSrlLoc: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [],
      tySrlNo:[],
      attribute1:[],
    })
  }

  get f() { return this.DocSeriealMasterForm.controls; }

  ngOnInit(): void {
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    


    this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
    // this.service.recvTypeIdList()
    //   .subscribe(
    //     data => {
    //       this.recvTypeIdList = data;
    //       console.log(this.recvTypeIdList);
    //     }
    //   );
      this.service.docTypeList()
        .subscribe(
          data =>{ this.docTypeList = data;
          });

    this.service.
    locationIdList()
      .subscribe(
        data => {
          this.locIdList = data;
          console.log(this.locIdList);
        }
      );
    this.service.DivisionIDList()
      .subscribe(
        data => {
          this.DivisionIDList = data;
          console.log(this.DivisionIDList);
        }
      );
      this.service.FinancialYear()
      .subscribe(
        data => {this.FinancialYear = data;
        }
        );
    this.service.DepartmentList()
      .subscribe(
        data => {
          this.DepartmentList = data;
          console.log(this.DepartmentList);
        }
      );

    this.service.OUIdList()
      .subscribe(
        data => {
          this.ouIdList = data;
          console.log(this.ouIdList);
        }
      );

      // this.service.OUIdListDiv(Number(sessionStorage.getItem('divisionId')))
      // .subscribe(
      //   data => {
      //     this.ouIdList = data;
      //     console.log(this.ouIdList);
      //   }
      // );

      

      this.searchMast();

  }


  DocSeriealMaster(DocSeriealMasterForm: any) {
  }
  onOptionsSelected(event: any) {
    this.Status1 = this.DocSeriealMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.DocSeriealMasterForm.get('endDate').reset();
    }
  }
  transData(val) {
    delete val.docSrlId;
    return val;
  }

  // documentSequence(event:any)
  // documentSequence()
  // {
  //   const docSeq =this.DocSeriealMasterForm.get('divisionId').value;
  //   const docLoc=this.DocSeriealMasterForm.get('docSrlLoc').value;
  //   this.docSrlNo=Number(docSeq+''+docLoc);
  //   alert(docLoc);
  //   // this.DocSeriealMasterForm.patchValue(this.divisionId);

   // }

   TestSrl() {

    const finYear=this.DocSeriealMasterForm.get('financialYear').value;
    const docSeq =this.DocSeriealMasterForm.get('divisionId').value;
    const docLoc : number=this.DocSeriealMasterForm.get('docSrlLoc').value;
    let select =this.locIdList.find(d=>d.locId=== docLoc);
    var b=select.locCode;
    var temp=b.split('.');
   
   var srl1 =finYear+'-'+docSeq+'-'+temp[1]+'-'+this.attribute1+'-'+this.tySrlNo+'-'+this.docSrlPrefix;
   var srl2 =finYear+docSeq+temp[1]+this.attribute1+this.tySrlNo+this.docSrlPrefix;
   alert ("FINYR-DIVID-LOC-DEPT-TRANSSRL-DOCSTARTNO >> "+ srl1 +"   ,  " +srl2);
   alert("docSrlType : "+this.DocSeriealMasterForm.get('docSrlType').value);

 
    this.docSrlNo=Number(finYear+''+docSeq+''+temp[1]+''+this.attribute1+''+this.tySrlNo+''+this.docSrlPrefix);


   }

  newMast() {

    const finYear=this.DocSeriealMasterForm.get('financialYear').value;
    const docSeq =this.DocSeriealMasterForm.get('divisionId').value;
    const docLoc : number=this.DocSeriealMasterForm.get('docSrlLoc').value;
    let select =this.locIdList.find(d=>d.locId=== docLoc);
    var b=select.locCode;
    var temp=b.split('.');

    alert("docSrlType : "+this.DocSeriealMasterForm.get('docSrlType').value);

    if(this.DocSeriealMasterForm.get('docSrlType').value==="PO")
    {
      this.docSrlNo=Number(finYear+''+docSeq+''+temp[1]+''+this.attribute1+''+1+''+this.docSrlPrefix);
    }
    else
    {
    this.docSrlNo=Number(finYear+''+docSeq+''+temp[1]+''+this.attribute1+''+this.tySrlNo+''+this.docSrlPrefix);
    }

    alert('this.docSrlNo'+this.docSrlNo)
    

    const formValue: IserialMaster = this.transData(this.DocSeriealMasterForm.value);

    formValue.docSrlNo =this.docSrlNo
    this.service.docSeqMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.DocSeriealMasterForm.disable();
          // window.location.reload();
      } else {
        if (res.code === 400) {
          alert('Data already present in the data base');
            // this.DocSeriealMasterForm.reset();
        }
      }

    });


  }



  updateMast() {
    const formValue: IserialMaster = this.DocSeriealMasterForm.value;
    this.service.UpdatedocSeqMasterById(formValue, formValue.docSrlId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        this.DocSeriealMasterForm.disable();
        // window.location.reload();

      } else {
        if (res.code === 400) {
           alert('ERROR OCCOURED IN PROCEESS');
          // this.DocSeriealMasterForm.reset();
        }
      }
    });
  };

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  searchMast() {
    this.service.getdocSeqSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  };

  Select(docSrlId: number) {
    this.DocSeriealMasterForm.reset();

    let select = this.lstcomments.find(d => d.docSrlId === docSrlId);
    if (select) {

      this.DocSeriealMasterForm.patchValue(select);
      this.divisionId=select.divisionId;
       this.docSrlOu =Number(select.docSrlOu);
       this.docSrlLoc =Number(select.docSrlLoc);
       this.deptId=select.deptId;
       this.financialYear=select.financialYear;
       this.docSrlType=select.docSrlType;
       this.recvTypeId=select.recvTypeId;
       this.status=select.status;
      // alert ("Ou Id :"+this.docSrlOu + "," + this.divisionId);
      this.displayButton = false;
      this.display = false;
    }
  }

  onOptionSelectedLocation(event:any)
  {
    var orgCode= this.DocSeriealMasterForm.get('docSrlOu').value;
    if(orgCode !=null) {
    // alert('ou '+ orgCode);
    this.service.getLocationId(orgCode).subscribe(
      data=>{this.locIdList=data;
        console.log(this.locIdList);
        // this.DocSeriealMasterForm.patchValue(this.organizationCode);

      }
    ); }

  }
  onOptionSelectedOrganization(event:any)
  {
    var divCode=this.DocSeriealMasterForm.get('divisionId').value;
    if(divCode !=null) {
    // this.docSrlPrefix=divCode;
    alert('divid '+ divCode);
    this.service.getOrganizationId(divCode).subscribe(
      data => {this.ouIdList = data;
      });}
  }


  onOptionSelectedtransType(event)
  {
     if (event !=null) {
      if(event==='PO')
      {

        this.trandistype=false;
        this.recvTypeId=1;
      } else {
       
        var ouId=this.DocSeriealMasterForm.get('docSrlOu').value;
         this.service.getTransType(event,ouId)
            .subscribe(data => {
              this.transtype = data;
           });

  } } }


  onOptionSelectedSerialType(event:any){
    var type=this.DocSeriealMasterForm.get('docSrlType').value;
    // alert(type+","+event);
    this.service.getSrlNo(type,event)
    .subscribe(data=> {
      this.tySrlNo = data.tySrlNo;
      console.log( this.tySrlNo

      );

    });

  }
  onOptionSelectedCostCentre(event){
    // alert(event);
    let select = this.DepartmentList.find(d => d.cmnTypeId === event);
    // const dept='Dept';
     this.service.getcoCent(select.code)
       .subscribe(data =>{
          this.attribute1 = data.attribute1;
          // alert(this.attribute1+'attribute1');
          // this.deptId=data.cmnTypeId;
        } );

  }
}

