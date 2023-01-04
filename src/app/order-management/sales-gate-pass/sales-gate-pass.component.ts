import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from 'src/app/order-management/order-management.service';
import { MasterService } from 'src/app/master/master.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, Location } from '@angular/common';


const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};




@Component({
  selector: 'app-sales-gate-pass',
  templateUrl: './sales-gate-pass.component.html',
  styleUrls: ['./sales-gate-pass.component.css']
})
export class SalesGatePassComponent implements OnInit {
  SalesGatepassForm: FormGroup;

  pipe = new DatePipe('en-US');
  now = Date.now();
  gpDate1 = this.pipe.transform( Date.now(), 'y-MM-dd');
  minDate = new Date();
  public insNameList: Array<string>[];
  public insSiteList: Array<string>[];
  lstPendingGatepass: any[];

  isDisabled = false;
  isDisabled2 = true;
  gatepassNo: number;
  dateOfDelv: Date;
  itemId: number; 
  segment: String;
  regNo: string;
  vin: String;
  // password:String='Super@2022';
  // userName:String='SuperUser';
  password:string;
  userName:string;
  modelVarClr: String;
  deliveryLoc: String;
  vehicleNo: String;
  serviceLoc: String;
  orderNumber: number;
  // orderNumber=222220210600263;
   
  trxNumber: number;
  trxDate: Date;
  dmsSob: String;
  remark: String;
  balOutstandAmt: number;
  excessAmt: number
  lstcomments: any;
  emplId: number;
  invoiceNo: number;
  invoiceDt: Date;
  custName: string;
  custAdd: string;
  contactNo: number;
  contactPerson: string;
  salesExeName: string;
  private sub: any;
  shipToLoc: number;
  public BillShipList: Array<string> = [];
  regDate: Date;
  isVisiblegatePassDetails: boolean = false;
  isVisiblegatePassVehicleDetails:boolean=false;
  isVisibleInsDetails:boolean=false;
  downloadButton=false;

  insType :string;
  insuDate:string;
  policyNo :string ; //='222220210600263';
  insuPeriod:number;
  insurerCompId:number;
  insurerSiteId:number;
  insurerIdName:string;
  insurerSiteName:string;
  isDisabledIns=true;


  constructor(private fb: FormBuilder, private router: Router, private router1: ActivatedRoute, private service: MasterService, private orderManagementService: OrderManagementService) {
    this.SalesGatepassForm = fb.group({
      gatepassNo: [''],
      shipToLoc: [''],
      orderNumber: [''],
      emplId: [''],
      segment: [],
      vin: [],
      itemId: [],
      regNo: ['',[Validators.required,]],
      regDate: [],
      modelVarClr: [],
      deliveryLoc: [],
      serviceLoc: [],
      dateOfDelv: [],
      invoiceNo: [],
      invoiceDt: [],
      vehicleNo: [],
      dmsSob: [],
      remark: [],
      custName: [],
      custAdd: [],
      contactNo: [],
      contactPerson: [],
      salesExeName: [],
      balOutstandAmt: [],
      excessAmt: [],
      userName:[],
      password:[],
      insType :[],
      policyNo:[],
      insuDate:[],
      insuPeriod:[],
      insurerCompId:[],
      insurerSiteId:[],
      insurerIdName:[],
      insurerSiteName:[],
    })
  }
  ngOnInit(): void {
    this.emplId = Number(sessionStorage.getItem('emplId'));
    // this.shipToLoc = Number(sessionStorage.getItem('locCode'));
    // this.shipToLoc = Number(sessionStorage.getItem('locId'));
    this.isVisiblegatePassDetails = false;
    this.isVisiblegatePassVehicleDetails=false;

    this.sub = this.router1.params.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      // alert(this.orderNumber)
      if (this.orderNumber != undefined) {
        this.gatePassOrderNo(this.orderNumber);
      }
    });


    this.service.getLocationSearch1(sessionStorage.getItem('ouId'))
      .subscribe(
        data => {
          this.BillShipList = data;
          console.log(this.BillShipList);
        }
      );


      this.service.insNameList()
      .subscribe(
        data => {
        this.insNameList = data;
        console.log(this.insNameList);
      } );

        var mDate = this.pipe.transform(this.gpDate1, 'dd-MMM-y');
        this.orderManagementService.gatePassPendList(mDate,sessionStorage.getItem('locId'))
          .subscribe(
            data => {
              this.lstPendingGatepass = data;
              console.log(this.lstPendingGatepass);
        })

  }

  gatePassOrderNo(orderNumber) {
    // alert(orderNumber);
    this.orderManagementService.getGatepassSearch(orderNumber)
      .subscribe(
        data => {
          this.lstcomments = data.obj;
          console.log(this.lstcomments);
          this.vehicleNo = this.lstcomments.vehicleNo;
          this.dateOfDelv = this.lstcomments.dateOfDelv;
          this.segment = this.lstcomments.segment;
          this.vin = this.lstcomments.vin;
          this.modelVarClr = (this.lstcomments.model + ' ' + this.lstcomments.description + ' ' + this.lstcomments.colorDesc);
          this.deliveryLoc = this.lstcomments.deliveryLoc;
          this.serviceLoc = this.lstcomments.serviceLoc;
          this.orderNumber = this.lstcomments.orderNumber;
          this.invoiceNo = this.lstcomments.invoiceNo;
          this.invoiceDt = this.lstcomments.invoiceDt;
          this.itemId = this.lstcomments.itemId;
          this.dmsSob = this.lstcomments.dmsSob;
          this.remark = this.lstcomments.remark;
          this.balOutstandAmt = this.lstcomments.balOutstandAmt;
          this.excessAmt = this.lstcomments.excessAmt;
          this.custName = this.lstcomments.custName;
          this.custAdd = this.lstcomments.custAdd;
          this.contactNo = this.lstcomments.contactNo;
          this.salesExeName = this.lstcomments.salesRepName;
          this.contactPerson = this.lstcomments.contactPerson;
          this.gatepassNo = this.lstcomments.gatePassNo;
          this.dateOfDelv = this.lstcomments.orderDate;
          this.insType= this.lstcomments.insType;
          this.insurerCompId= this.lstcomments.insurerCompId;
          this.insurerSiteId= this.lstcomments.insurerSiteId;
          this.insuDate= this.lstcomments.insuDate;
          this.policyNo= this.lstcomments.policyNo;
          this.insuPeriod= this.lstcomments.insuPeriod;

          if (this.lstcomments.gatePassNo != 0) {
            this.isVisiblegatePassDetails = false;
            this.isVisiblegatePassVehicleDetails=false;
            this.isDisabled2=false;
            // this.isVisibleInsDetails=false;

          }
          else if (this.lstcomments.gatePassNo === 0 && this.lstcomments.vehicleNo ==='NA'  ) {
            this.isVisiblegatePassDetails = false;
            this.isVisiblegatePassVehicleDetails=true;
            // this.isVisibleInsDetails=true;
            this.isDisabled2=true;
          }
          else if (this.lstcomments.gatePassNo === 0 && this.lstcomments.vehicleNo !='NA'  ){
            this.isVisiblegatePassDetails = true;
            this.isVisiblegatePassVehicleDetails=false;
            // this.isVisibleInsDetails=true;
            this.isDisabled2=true;

          }

        if(this.lstcomments.gatePassNo === 0 && (this.lstcomments.policyNo==undefined || this.lstcomments.policyNo==null || this.lstcomments.policyNo.trim()=='')){ 
          this.isVisiblegatePassDetails = false;
          this.isVisiblegatePassVehicleDetails=true;
          // this.isVisibleInsDetails=true;
          this.isDisabled2=true;

        }
            
        if(this.lstcomments.gatePassNo === 0 && (this.lstcomments.insuDate==undefined|| this.lstcomments.insuDate==null || this.lstcomments.insuDate.trim()=='')){ 
          this.isVisiblegatePassDetails = false;
          this.isVisiblegatePassVehicleDetails=true;
          // this.isVisibleInsDetails=true;
          this.isDisabled2=true;

        }
             

        }

      );


  }


  // gatepassNoSearch(orderNumber)
  // {
  //   this.orderManagementService.getGatepassSearch(orderNumber)
  //   .subscribe(
  //     data => {
  //       if (data.code===200){
  //         // alert('hi')
  //       this.lstcomments = data.obj;
  //       console.log(this.lstcomments);
  //       this.vehicleNo=this.lstcomments.vehicleNo;
  //       this.dateOfDelv=this.lstcomments.dateOfDelv;
  //       this.segment=data.obj.segment;
  //       this.vin=data.obj.vin;
  //       this.itemId=data.obj.itemId;
  //       this.modelVarClr=this.lstcomments.modelVarClr;
  //       this.deliveryLoc=this.lstcomments.deliveryLoc;
  //       this.serviceLoc=this.lstcomments.serviceLoc;
  //       this.orderNumber=this.lstcomments.orderNumber;
  //       this.trxNumber=this.lstcomments.trxNumber;
  //       this.trxDate=this.lstcomments.trxDate;
  //       this.dmsSob=this.lstcomments.dmsSob;
  //       this.remark=this.lstcomments.remark;
  //       this.balOutstandAmt=this.lstcomments.balOutstandAmt;
  //       this.excessAmt=this.lstcomments.excessAmt;
  //       this.SalesGatepassForm.patchValue(this.lstcomments);
  //     }
  //     else if (data.code===400){
  //       alert(data.message)
  //     }
  //   }

  //   );
  //    }

  // -------------------New GatePass Fn ---by rk 27/8/22
  SalesGatePassPost(){

    if(this.policyNo==undefined|| this.policyNo==null || this.policyNo.trim()==''){ alert("Policy No should not be null..");return;}
    if(this.insuDate==undefined|| this.insuDate===null || this.insuDate.trim()==''){ alert("Policy Date should not be null..");return;}

    this.isDisabled = true;
    const formValue =this.SalesGatepassForm.value;

    var srvLoc =this.SalesGatepassForm.get('shipToLoc').value;

    if(srvLoc==undefined || srvLoc==null || srvLoc<=0) { alert ("Please Select Service Location.");return;}
    var mreg= this.SalesGatepassForm.get('regNo').value;
  

    this.orderManagementService.SalesGatePassGenSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.gatePassOrderNo(this.orderNumber);
        //window.location.reload();
        this.gatepassNo = res.obj;
      } else {
        if (res.code === 400) {
          alert(res.message + '---' + res.obj);
          // window.location.reload();
        }
      }
    });
  }


// -------------------Old GatePass Fn ---
  orderNumberPost(orderNumber, locId) {
    this.orderManagementService.orderNoPost(orderNumber, this.emplId, locId).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.gatePassOrderNo(this.orderNumber);
        //window.location.reload();
        this.gatepassNo = res.obj;
      } else {
        if (res.code === 400) {
          alert(res.message + '---' + res.obj);
          // window.location.reload();
        }
      }
    });
  }



  SalesGatepass(SalesGatepassForm) { }
  get f() { return this.SalesGatepassForm.controls; }


  vehiclePolicyupdate(itemId, regNo, regDate) {

    var policuNum=this.SalesGatepassForm.get('policyNo').value;
    var policyDate=this.SalesGatepassForm.get('insuDate').value;
       
    if(policuNum==undefined|| policuNum==null || policuNum.trim()==''){ alert("Policy No should not be null..");return;}
    if(policyDate==undefined|| policyDate==null || policyDate.trim()==''){ alert("Policy Date should not be null..");return;}

    // alert ("Regno & Policy no is ok...."); return;

    var customerId=this.lstcomments.customerId;
    var orderedDate2 = this.pipe.transform(regDate, 'MM/dd/yyyy');

    const formValue= this.SalesGatepassForm.value;

      // this.orderManagementService.vehicleNoupdateFn(itemId, regNo, orderedDate2,customerId).subscribe((res: any) => {
    this.orderManagementService.vehicleNoInsuranceupdateFn(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.gatePassOrderNo(this.orderNumber);
        this.gatepassNo = res.obj;
      } else {
        if (res.code === 400) {
          alert(res.message + '---' + res.obj);
        }
      }
    });
  }


  vehicleNoupdate(itemId, regNo, regDate) {

    if (regNo === undefined || itemId === undefined || regDate === undefined) {
      alert('Please Enter All required Details...!')
      return;
    }

    if(regNo==undefined|| regNo==null || regNo.trim()==''){ alert("Reg No should not be null..");return;}
    // alert(regNo.trim()=='')
    // alert("Registration No1:"+regNo +","+regNo.length);
    var regNo1=regNo.toUpperCase();
    regNo1 =regNo1.trim();
    // this.regNo=regNo1
    this.SalesGatepassForm.patchValue({regNo:regNo1});

    alert("Registration No:"+this.regNo+","+regNo1.length);  
    var policuNum=this.SalesGatepassForm.get('policyNo').value;
    var policyDate=this.SalesGatepassForm.get('insuDate').value;
       
    // if(policuNum==undefined|| policuNum==null || policuNum.trim()==''){ alert("Policy No should not be null..");return;}
    // if(policyDate==undefined|| policyDate==null || policyDate.trim()==''){ alert("Policy Date should not be null..");return;}

    var customerId=this.lstcomments.customerId;
    var orderedDate2 = this.pipe.transform(regDate, 'MM/dd/yyyy');

    const formValue= this.SalesGatepassForm.value;

    // this.orderManagementService.vehicleNoInsuranceupdateFn(formValue).subscribe((res: any) => {
    //   if (res.code === 200) {
    //     alert(res.message);
    //     this.gatePassOrderNo(this.orderNumber);
    //     this.gatepassNo = res.obj;
    //   } else {
    //     if (res.code === 400) {
    //       alert(res.message + '---' + res.obj);
    //     }
    //   }
      
    // });

    this.orderManagementService.vehicleNoupdateFn(itemId, regNo1, orderedDate2,customerId).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.gatePassOrderNo(this.orderNumber);
          this.gatepassNo = res.obj;
        } else {
          if (res.code === 400) {
            alert(res.message + '---' + res.obj);
          }
        }
      });
    
  }


  resetMast() {
    window.location.reload();
  }

  Close() {
    this.router.navigate(['admin']);
  }




  downloadGatePass() {
    // const fileName = 'download.pdf';
    // const EXT = fileName.substr(fileName.lastIndexOf('.') + 1);
    this.orderManagementService.downloadGatePass(this.orderNumber)
      .subscribe(data => {
        // saveAs(new Blob([data], { type: MIME_TYPES[EXT] }));
        var blob = new Blob([data], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var printWindow = window.open(url, '', 'width=800,height=500');
        printWindow.open
      });
  }

  onInsurerNameSelected(customerId: number) {
    // alert('in '+ customerId)
    if(customerId >0) {
    this.service.insSiteList(customerId)
      .subscribe(
        data => {
          this.insSiteList = data.customerSiteMasterList;
          console.log(this.insSiteList);
        }
      );
  } }


  validatePolicyDate(policyDate) {
    var currDate = new Date();
    var invDate = this.SalesGatepassForm.get('invoiceDt').value;
    var billDate = new Date(invDate);
    var insDate =new Date(policyDate);
    alert (insDate +","+billDate);
    if (insDate < billDate) {
      alert("POLICY DATE :" + "Should not be below Vehcile Sale Date");
      this.insuDate = this.pipe.transform(Date.now(), 'y-MM-dd');
    }
  }

    validatePolicyTerm(prd) { 
      // alert ("Period : "+prd);
      if(prd<0 || prd ==undefined || prd==null) {alert ("POLICY TERM : Please Enter valid Policy Period..")
      this.SalesGatepassForm.patchValue({insuPeriod:0});
     }
      

    }

    SelectOrdNum(ordNumber){
      alert ("Order Number Seleted :" + ordNumber);

    }
    login(){
      alert(this.userName+'------****'+this.password);
      // password:String='Super@2022';
  // userName:String='SuperUser';
      if (this.userName==='SuperUser'&& this.password==='Super@2022'){
        alert('Login Successfully..!')
      }
    }
}
