import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { data } from 'jquery';
import { MasterService } from 'src/app/master/master.service';
import { stringify } from 'querystring';

interface IsubinventoryTransfer
{
  subInventoryCode:string;
  transferSubInv:string;
  transDate:Date;
  shipmentNumber:string;
  remarks:string;
  issueBy:string;
  Rack:string;
  RackNo:number;
  deptId:number;
  divisionId:number;
  Row:string;
  RowNo:number;
  Floor:string;
  lineNumber:number;
  name: string;

  itemId:number;
  segment:string;
  description:string;
  uom:string;
  issueTo:string;
  frmLocator:number;
  transferLocatorId:number;
  onHandId:number;
  primaryQty:number;
  onHandQty:number;
  LocatorSegment:string;
}


@Component({
  selector: 'app-subinventory-transfer',
  templateUrl: './subinventory-transfer.component.html',
  styleUrls: ['./subinventory-transfer.component.css']
})
export class SubinventoryTransferComponent implements OnInit {
SubinventoryTransferForm:FormGroup;

public subInvCode:any=[];
public ItemIdList:any=[];
public issueByList:Array<string>=[];
getItemDetail:any;
getfrmSubLoc:any;
LocatorList:any;
locData =[ {
  "locatorId": 999,
  "segmentName": "D.U.01.D.01",
  "id": 7,
  "onHandQty": 40
}];
onhand:any;
locId:number;
showModal:boolean;
deptId:number;
divisionId:number;

subInventoryCode:string;
transferSubInv:string;
transDate:Date;
remarks:string;
issueBy:string;
Rack:string;
RackNo:number;
shipmentNumber:string;
Row:string;
RowNo:number;
Floor:string;
content: number;
issueTo:string;
title: string;
name:string;

itemId:number;
segment:string;
onHandId:number;
description:string;
uom:string;
frmLocator:number;
transferLocatorId:number;
primaryQty:number;
onHandQty:number;
LocatorSegment:string;
lineNumber:number;

userList2: any[] = [];
lastkeydown1: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) {
    this.SubinventoryTransferForm=fb.group({

      shipmentNumber:[],
      subInventoryCode:[],
      transferSubInv:[],
      transDate:[],
      issueBy:[],
      remarks:[],
      Floor:[''],
      Rack:[''],
      RackNo:[''],
      Row:[''], 
      RowNo:[''],
      locId:[],
      issueTo:[],
      trfLinesList: this.fb.array([]),
    })
   }
  
   trfLinesList():FormArray{
     return this.SubinventoryTransferForm.get("trfLinesList") as FormArray
   }

   newtrfLinesList():FormGroup{
     return this.fb.group({
      itemId:[],
      segment:[],
      description:[],
      uom:[],
      frmLocator:[],
      transferLocatorId:[],
      primaryQty:[],
      onHandQty:[],
      LocatorSegment:[],
      lineNumber:[],
      onHandId:[],
     })
   }

   addnewtrfLinesList()
   {
     this.trfLinesList().push(this.newtrfLinesList());
     var len = this.trfLinesList().length;
     var patch = this.SubinventoryTransferForm.get('trfLinesList') as FormArray;
     (patch.controls[len - 1]).patchValue(
       {
         lineNumber: len,
       }
     );
   }

   removetrfLinesList(trfLineIndex){
    this.trfLinesList().removeAt(trfLineIndex);
   }
  ngOnInit(): void {

    this.locId = Number(sessionStorage.getItem('locId'));
    this.issueBy = (sessionStorage.getItem('name'));
    this.deptId=Number(sessionStorage.getItem('dept'));
    this.divisionId=Number(sessionStorage.getItem('divisionId'));
    this.service.subInvCode2(this.deptId,this.divisionId).subscribe(
      data => {
        this.subInvCode = data;
      });
      this.service.issueByList(this.locId,this.deptId,this.divisionId).subscribe
      (data => {this.issueByList = data;
          console.log(this.issueByList);
        });


      this.service.ItemIdList().subscribe(
        data => {
          this.ItemIdList = data;
          console.log(this.ItemIdList);
          // console.log(this.invItemId);
        });
        this.addnewtrfLinesList();
        var patch = this.SubinventoryTransferForm.get('trfLinesList') as  FormArray
        (patch.controls[0]).patchValue(
       {
         lineNumber: 1,
       }
     );
  }

  subinventoryTransfer(SubinventoryTransferForm:any)
  {}

  getInvItemId($event)
  {
    // alert('in getInvItemId')
     let userId=(<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
     this.userList2=[];
     if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.ItemIdList, userId);
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

  onOptiongetdetails(event:any,i)
  {
    alert(event);
    // alert(event);
    var temp = event.split('--');
    alert(temp[0]);
  var segment = temp[0];
    var trxLnArr=this.SubinventoryTransferForm.get('trfLinesList').value;
    let select1=this.ItemIdList.find(d=>d.SEGMENT == segment);
      // var itemId= select1.itemId
      console.log(select1.itemId);
      
      alert(select1.itemId)
      var trxLnArr1=this.SubinventoryTransferForm.get('trfLinesList')as FormArray;
      trxLnArr1.controls[i].patchValue({itemId:select1.itemId});
      var subcode=this.SubinventoryTransferForm.get('subInventoryCode').value;
      let select2=this.subInvCode.find(d=>d.subInventoryCode===subcode)
      this.service.getItemDetail(select1.itemId).subscribe
      (data => {this.getItemDetail = data;
         if(this.getItemDetail.description !=undefined){
          trxLnArr1.controls[i].patchValue({description: this.getItemDetail.description});
          trxLnArr1.controls[i].patchValue({uom:this.getItemDetail.uom});
          trxLnArr1.controls[i].patchValue({locId:Number(sessionStorage.getItem('locId'))})
        }
      } );
      
      this.service.getfrmSubLoc(this.locId, select1.itemId, select2.subInventoryId).subscribe(
        data => {
          this.getfrmSubLoc = data;
          console.log(data);
          var getfrmSubLoc =data;
          
            alert(i +'i');
            this.locData[i] = data;
            if(getfrmSubLoc.length==1)
            {
            // this.displayLocator[i]=false;
            trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
            // trxLnArr1.controls[i].patchValue({locatorId:getfrmSubLoc[0].locatorId});
            trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty});
            trxLnArr1.controls[i].patchValue({onHandId:getfrmSubLoc[0].id});
            }
            
            else
            {
              // this.getfrmSubLoc=data;
           trxLnArr1.controls[i].patchValue({frmLocator:getfrmSubLoc[0].segmentName});
          //  trxLnArr1.controls[i].patchValue({onHandQty:getfrmSubLoc[0].onHandQty})
           trxLnArr1.controls[i].patchValue({onHandId:getfrmSubLoc[0].id});
            }
    
        });
   
      

  }
  OpenLocator(i)
        {
  
          var LocSegment=this.trfLinesList().controls[i].get('LocatorSegment').value;
  
          if (LocSegment===null)
          {
            this.SubinventoryTransferForm.get('Floor').reset();
            this.SubinventoryTransferForm.get('Rack').reset();
            this.SubinventoryTransferForm.get('RackNo').reset();
            this.SubinventoryTransferForm.get('Row').reset();
            this.SubinventoryTransferForm.get('RowNo').reset();
          }
          if(LocSegment!=null)
          {
            var temp = LocSegment.split('.');
            // alert(temp[0]);
            this.Floor= temp[0];
            this.Rack = temp[1];
            this.RackNo = temp[2];
            this.Row = temp[3];
            this.RowNo = temp[4];
          }
              // this.showModal = true;
              this.content = i;
              let a = i + 1
              this.title = "Locator :" + a;
  
  
        }
  
        okLocator(i)
        {
  
          // alert(i);
          var LocSegment=this.SubinventoryTransferForm.get('trfLinesList').value;
          var patch = this.SubinventoryTransferForm.get('trfLinesList') as FormArray;
          LocSegment[i].LocatorSegment=this.SubinventoryTransferForm.get('Floor').value+'.'+
                                       this.SubinventoryTransferForm.get('Rack').value+'.'+
                                       this.SubinventoryTransferForm.get('RackNo').value+'.'+
                                       this.SubinventoryTransferForm.get('Row').value+'.'+
                                       this.SubinventoryTransferForm.get('RowNo').value;
  
  
          var LocatorSegment1=LocSegment[i].LocatorSegment;
          // alert(this.LocatorSegment1);
          patch.controls[i].patchValue({'LocatorSegment': LocSegment[i].LocatorSegment})
  
          this.service.LocatorNameList(LocatorSegment1,Number(sessionStorage.getItem('locId'))).subscribe
          (data =>{
             this.LocatorList = data
  
             if(this.LocatorList.code===200)
             {
              (patch.controls[i]).patchValue({ transferLocatorId: this.LocatorList.obj.locatorId })
  
             if(this.LocatorList.lengh==0)
             {
               alert('Invalid Code Combination');
             }
             else{
               this.transferLocatorId=(this.LocatorList.obj.locatorId);
             }
            }
            else if (this.LocatorList.code===400) {
              var arraycontrol =this.SubinventoryTransferForm.get('trfLinesList').value;
              patch.controls[i].patchValue({LocatorSegment : ''});
            }
  
            });
            this.SubinventoryTransferForm.get('Floor').reset();
            this.SubinventoryTransferForm.get('Rack').reset();
            this.SubinventoryTransferForm.get('RackNo').reset();
            this.SubinventoryTransferForm.get('Row').reset();
            this.SubinventoryTransferForm.get('RowNo').reset();
            alert('locator search complete')
         }

         closesubTrf() {
          this.router.navigate(['admin']);
        }
        resetsubTrf() {
          window.location.reload();
        }

        AvailQty(event:any,i:number) 
        {
          var trxLnArr1=this.SubinventoryTransferForm.get('trfLinesList')as FormArray;
          var trxLnArr = this.SubinventoryTransferForm.get('trfLinesList').value;
          var itemid=trxLnArr[i].itemId;
          var locId=trxLnArr[i].frmLocator;
          // trxLnArr1.controls[i].patchValue({locatorId:locId});
          alert(locId+'locatorID');
          var subcode=this.SubinventoryTransferForm.get('subInventoryCode').value;
          alert(subcode);
          let select2= this.subInvCode.find(d=>d.subInventoryCode===subcode);
          alert(select2.subInventoryId+'Id')
          this.service.getonhandqty(Number(sessionStorage.getItem('locId')),select2.subInventoryId,locId,itemid).subscribe
            (data =>{ 
              this.onhand = data;
              console.log(this.onhand);
              trxLnArr1.controls[i].patchValue({onHandQty:data.obj.onHandQty});
              trxLnArr1.controls[i].patchValue({onHandId:data.obj.id});
           })
          
        }

        newSubtrf()
        {
          const formValue:IsubinventoryTransfer=this.SubinventoryTransferForm.value;
          let variants=<FormArray>this.trfLinesList();
          var tranda = this.SubinventoryTransferForm.get('transDate').value;
          var frmcode= this.SubinventoryTransferForm.get('subInventoryCode').value;
          var tocode = this.SubinventoryTransferForm.get('transferSubInv').value;
          var issby  = this.SubinventoryTransferForm.get('issueBy').value;
          var issto = this.SubinventoryTransferForm.get('issueTo').value;
          var rmks   = this.SubinventoryTransferForm.get('remarks').value;
          var locId1  =  this.SubinventoryTransferForm.get('locId').value;

          for (let i = 0; i < this.trfLinesList().length; i++) {
            let VariantFormGroup =<FormGroup>variants.controls[i];
            VariantFormGroup.addControl('transDate',new FormControl(tranda, Validators.required));
            VariantFormGroup.addControl('subInventoryCode',new FormControl(frmcode,Validators.required));
            VariantFormGroup.addControl('transferSubInv',new FormControl(tocode,Validators.required));
            VariantFormGroup.addControl('issueBy',new FormControl(issby,Validators.required));
            VariantFormGroup.addControl('remarks',new FormControl(rmks,Validators.required));
            VariantFormGroup.addControl('orgId',new FormControl(locId1,Validators.required));
            VariantFormGroup.addControl('transferOrgId',new FormControl(locId1,Validators.required));
            VariantFormGroup.addControl('issueTo',new FormControl(issto,Validators.required));
              }
          
              this.service.subInvTransferSubmit(variants.value).subscribe((res: any) => {
                //  var obj=res;
                // sessionStorage.setItem('shipmentNumber',obj[0].shipmentNumber);
                if (res.code === 200) {
                  alert("Record inserted Successfully");
                  // this.shipmentNumber =res.obj.shipmentNumber;
                   this.SubinventoryTransferForm.patchValue(
                  // //  'issueBy':res.obj[0].issueTo,
                  { 'shipmentNumber':res.obj[0].shipmentNumber})
                    this.SubinventoryTransferForm.disable();

                  // // 'transReference':res.obj[0].transReference}
                  // );
                  //  var trxLnArr2 = this.SubinventoryTransferForm.get('trfLinesList') as FormArray;
                  //  for(let i=0; i<res.obj.length; i++){
                  //   // trxLnArr2.controls[i].patchValue(res.obj[i]);
                  
                  // trxLnArr2.controls[i].patchValue({'segment':res.obj[i].segment});
                  // trxLnArr2.controls[i].patchValue({'locator':res.obj[i].locator});
                  // trxLnArr2.controls[i].patchValue({'avlqty':res.obj[i].avlqty});
                  // trxLnArr2.controls[i].patchValue({'primaryQty':res.obj[i].primaryQty});
                  // }
                  
                  // this.display = false;
                  // this.displayButton = false;
                }
                else {
                  if (res.code === 400) {
                    alert("Code already present in data base");
                    this.SubinventoryTransferForm.reset();
                  }
                }
              });
          


        }
}
