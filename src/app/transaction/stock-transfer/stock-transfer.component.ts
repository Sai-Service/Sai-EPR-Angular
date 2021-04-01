// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';


interface IStockTransfer {
  ShipmentNo: String;
  status: string;
  issueTo: string;
  transferOrgId: number;
  itemId: number;
  subInventoryCode: string;
  shipmentNumber: string;
  // IssueTo:number,
  locatorId: number;
  description: string;
  uom: string;
  ewayBill: string;
  remarks: string;
  ewayBillDate: Date;
  issueBy: string;
  transDate: Date;
  onHandId: number;
  primaryQty: number;
}

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {
  stockTranferForm: FormGroup;
  ShipmentNo: string;
  shipmentNumber: string;
  locId: number;
  issueBy: string;
  onHandId: number;
  // status:string;
  public status: string = 'Active';
  deptId: number;
  divisionId: number;
  ewayBill: string;
  ewayBillDate: Date;
  transQuantity: number;
  primaryQty: number;
  public ItemIdList: Array<string> = [];
  public subInvCode: any[];
  public issueByList: Array<string> = [];
  public locIdList: any[];
  itemId: number;
  issueTo: string;
  subInventoryId: number;
  getfrmSubLoc: any;
  subInventoryCode: string;
  getItemDetail: any;
  transferOrgId: number;
  locatorId: number;
  // Locator:any[];
  description: string;
  uom: string;
  display = true;
  displayButton = true;
  transDate: Date;
  lstcomment: any;
  remarks: string;
  segment: string;
  locator: string;
  transCost: number;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.stockTranferForm = fb.group({
      ShipmentNo: [],
      locId: [''],
      shipmentNumber: [''],
      transferOrgId: [''],
      issueTo: [''],
      ewayBill: [''],
      ewayBillDate: [''],
      remarks: [''],
      issueBy: [''],
      transDate: [''],
      status: ['', [Validators.required]],
      trxLinesList: this.fb.array([]),

    }

    )
  }
  trxLinesList(): FormArray {
    return this.stockTranferForm.get("trxLinesList") as FormArray
  }
  newtrxLinesList(): FormGroup {
    return this.fb.group({
      LinNo: [''],
      itemId: [''],
      subInventoryCode: [''],
      // shipmentNumber:[''],
      // IssueTo:[''],
      onHandId: [''],
      description: [''],
      uom: [''],
      primaryQty: [''],
      locatorId: [''],
      segment: [''],
      locator: [''],
      transCost: [''],
    })
  }

  addnewtrxLinesList() {

    this.trxLinesList().push(this.newtrxLinesList());
  }
  removenewtrxLinesList(trxLineIndex) {
    this.trxLinesList().removeAt(trxLineIndex);
  }

  ngOnInit(): void {
    this.locId = Number(sessionStorage.getItem('locId'));
    this.deptId = Number(sessionStorage.getItem('dept'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.addnewtrxLinesList();

    this.service.ItemIdList().subscribe(
      data => {
        this.ItemIdList = data;
        // console.log(this.invItemId);
      });

    this.service.subInvCode().subscribe(
      data => {
        this.subInvCode = data;
        console.log(this.subInventoryId);
        // alert('subInventoryCode');
      });

    this.service.issueByList(this.locId, this.deptId, this.divisionId).subscribe
      (data => {
        this.issueByList = data;
        console.log(this.issueByList);
      });

    this.service.locationIdList().subscribe
      (data => {
        this.locIdList = data;

      });

  }
  stockTransfer(stockTranferForm: any) { }
  onOptionSelect(event: any, i) {
    alert(event);
    alert(this.locId);
    console.log(this.subInvCode);
    let select1 = this.subInvCode.find(d => d.subInventoryCode === event);
    console.log(select1);
    var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    alert(itemid + "itemId")

    this.service.getfrmSubLoc(this.locId, itemid, select1.subInventoryId).subscribe(
      data => {
        this.getfrmSubLoc = data;
        console.log(data);
      });

  }
  onOptionItemDetails(event: any, i) {
    var trxLnArr = this.stockTranferForm.get('trxLinesList').value;
    var itemid = trxLnArr[i].itemId;
    alert(itemid + "itemId")
    var trxLnArr1 = this.stockTranferForm.get('trxLinesList') as FormArray;
    // trxLnArr1.controls[i].patchValue({locatorId:this.getfrmSubLoc.locatorId})
    this.service.getItemDetail(itemid).subscribe
      (data => {
        this.getItemDetail = data;
        alert("this.getItemDetail.description" + this.getItemDetail.description);
        if (this.getItemDetail.description != undefined) {
          trxLnArr1.controls[i].patchValue({ description: this.getItemDetail.description });
          trxLnArr1.controls[i].patchValue({ uom: this.getItemDetail.uom });
        }

      }
      );
  }

  newStkTransfer() {

    const formValue: IStockTransfer = this.stockTranferForm.value;
    let variants = <FormArray>this.trxLinesList();
    var tranorgid = this.stockTranferForm.get('transferOrgId').value;
    var isso = this.stockTranferForm.get('issueTo').value;
    var ewaybil = this.stockTranferForm.get('ewayBill').value;
    var ewaydate = this.stockTranferForm.get('ewayBillDate').value;
    var rmark = this.stockTranferForm.get('remarks').value;
    var issb = this.stockTranferForm.get('issueBy').value;
    var tranda = this.stockTranferForm.get('transDate').value;
    var staus = this.stockTranferForm.get('status').value;
    for (let i = 0; i < this.trxLinesList().length; i++) {
      let variantFormGroup = <FormGroup>variants.controls[i];
      variantFormGroup.addControl('transferOrgId', new FormControl(tranorgid, Validators.required));
      variantFormGroup.addControl('issueTo', new FormControl(isso, Validators.required));
      variantFormGroup.addControl('ewayBill', new FormControl(ewaybil, Validators.required));
      variantFormGroup.addControl('ewayBillDate', new FormControl(ewaydate, Validators.required));
      variantFormGroup.addControl('remarks', new FormControl(rmark, Validators.required));
      variantFormGroup.addControl('issueBy', new FormControl(issb, Validators.required));
      variantFormGroup.addControl('transDate', new FormControl(tranda, Validators.required));
      variantFormGroup.addControl('status', new FormControl(staus, Validators.required));
      variantFormGroup.addControl('orgId', new FormControl(this.locId, Validators.required));
    }
    console.log(variants.value);
    this.service.stockTransferSubmit(variants.value).subscribe((res: any) => {
      // var obj=res;
      // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
      if (res.code === 200) {
        this.shipmentNumber = res.obj;
        alert("Record inserted Successfully");
        this.display = false;
        this.displayButton = false;
      }
      else {
        if (res.code === 400) {
          alert("Code already present in data base");
          this.stockTranferForm.reset();
        }
      }
    });
  }

  search(ShipmentNo) {
    // alert('1'+ShipmentNo);
    this.display = true;

    var shipNo = (this.stockTranferForm.get('ShipmentNo').value);
    // alert('2'+shipNo)
    this.service.getsearchByShipmentNo(shipNo).subscribe
      (data => {
        this.lstcomment = data;
        let control = this.stockTranferForm.get('trxLinesList') as FormArray;
        // data.forEach(f => {
        //   var trxlist:FormGroup=this.newtrxLinesList();
        //   this.trxLinesList().push(trxlist);
        // });
        var len = this.trxLinesList().length;
        for (let i = 0; i < data.length - len; i++) {
          var trxlist: FormGroup = this.newtrxLinesList();
          this.trxLinesList().push(trxlist);
        }

        this.stockTranferForm.patchValue(this.lstcomment[0]);
        this.displayButton = false;
        this.display = false;
        this.stockTranferForm.get('trxLinesList').patchValue(this.lstcomment);
        var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
        for (let i = 0; i < this.trxLinesList().length; i++) {
          patch.controls[i].patchValue({
            LinNo: i + 1
          })
        }

      }
      );

  }
  onSelectLocaorId(event: any, i) {
    alert('locatorSelect' + event);
    let select1 = this.getfrmSubLoc.find(d => d.id === event);
    console.log(select1);
    var patch = this.stockTranferForm.get('trxLinesList') as FormArray;
    patch.controls[i].patchValue({ locatorId: select1.locatorId });
  }
  closeMoveOrder() {
    this.router.navigate(['admin']);
  }
  resetMoveOrder() {
    window.location.reload();
  }

}
