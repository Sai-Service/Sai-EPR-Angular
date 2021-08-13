import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../../master/master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InteractionModeRegistry } from 'chart.js';
import { OrderManagementService } from 'src/app/order-management/order-management.service';


interface IMcpitemMapping {   }

@Component({
  selector: 'app-mcp-item-mapping',
  templateUrl: './mcp-item-mapping.component.html',
  styleUrls: ['./mcp-item-mapping.component.css']
})
export class McpItemMappingComponent implements OnInit {

  mcpItemMappingForm : FormGroup;

  public OUIdList           : Array<string> = [];
  public FuelTypeList       :Array<string> = [];
  public mainModelList      :Array<string>  = [];
  public ServiceModelList   :Array<string> = [];
  public VariantSearch:any;
  mcpItemList: any[];
  invItemList:any;
  variantDetailsList:any;
  lstMcpItem: any;

  showRelateItemSection=false;

      loginName:string;
        loginArray:string;
        divisionId:number;
        name:string;
        ouName : string;
        locId: number;
        locName : string;
        orgId:number;
        ouId :number;
        deptId:number; 
       emplId :number;
        // public emplId =6;
        userList2: any[] = [];
        lastkeydown1: number = 0;

        invItemId:number;
        segment:string;
        // relatedItem:string;

        erpCodeItemId:number;
        erpItemId:number;
        itemId:number;
        itemNumber: string;
        itemName:string;
        itemType:string;
        // itemDesc:string;
        // itemDisc:number;
        // startDate:Date;
        // endDate:Date;

        model:string;
        // variant:string;
        serviceModel:string;
        fuelType:string;
        quantity:number=1;
        erpCode:string;

        sitemNumber:string;
        sfuelType:string;
        sserviceModel:string;

      //////////////////////////////////
      displayInactive = true;
      Status1: any;
      inactiveDate: Date;
      display = true;
      displayButton = true;
      //////////////////////////////////

  get f() { return this.mcpItemMappingForm.controls; }
  mcpItemMapping(mcpItemMappingForm:any) {  }

        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpItemMappingForm = fb.group({ 
            loginArray:[''],
            loginName:[''],
            ouName :[''],
            divisionId:[],
            locId:[''],
            locName :[''],
            ouId :[],
            deptId :[],
            emplId:[''],
            orgId:[''],


            
            erpItemId:[],
            erpCodeItemId:[],
            itemId:[],
            itemNumber:[],
            itemName:[],
            itemType:[],
            // itemDesc:[],
            // itemDisc:[],
            // startDate:[],
            // endDate:[],

            model:[],
            // variant:[],
            serviceModel:[],
            fuelType:[],
            quantity:[],
            erpCode:[],

            invItemId:[],
            segment:[],
            // relatedItem:[],

            sitemNumber:[],
            sfuelType:[],
            sserviceModel:[],

            mcpRelatedItemList: this.fb.array([this.lineDetailsGroup()])   
          });
        }
    
        lineDetailsGroup() {
          return this.fb.group({
            // itemId :['', [Validators.required]],    
            itemName:['', [Validators.required]],
            itemDescription: ['', [Validators.required]],
            itemCategory: ['', [Validators.required]],
            // segment:[],
            uom:[],
            relatedId:[],
            mainPartId:[],
            mainPart:[],
            relatedItemId:[],
            relatedItem:[],
                    
           });
        }
      
       lineDetailsArray() :FormArray{
          return <FormArray>this.mcpItemMappingForm.get('mcpRelatedItemList')
        }

      

       

          ngOnInit(): void 
          {
            this.name=  sessionStorage.getItem('name');
            this.loginArray=sessionStorage.getItem('divisionName');
            this.divisionId=Number(sessionStorage.getItem('divisionId'));
            this.loginName=sessionStorage.getItem('name');
            this.ouName = (sessionStorage.getItem('ouName'));
            this.ouId=Number(sessionStorage.getItem('ouId'));
            this.locId=Number(sessionStorage.getItem('locId'));
            // this.locName=(sessionStorage.getItem('locName'));
            this.deptId=Number(sessionStorage.getItem('dept'));
            this.emplId= Number(sessionStorage.getItem('emplId'));
            this.orgId=this.ouId;
            console.log(this.loginArray);
            console.log(this.locId);

            
            this.service.mcpItemList()
            .subscribe(
              data => {
                this.mcpItemList = data;
                console.log(this.mcpItemList);
                // console.log(this.mcpItemList[0].itemId);
              }
            );

            this.service.invItemList1()
            .subscribe(
              data => {
                this.invItemList = data;
                console.log(this.invItemList);
              }
            );

            this.service.fuelTypeList()
            .subscribe(
            data => {
              this.FuelTypeList = data;
              console.log(this.FuelTypeList);
            }
          );

          this.service.serviceModelLst()
          .subscribe(
          data => {
            this.ServiceModelList = data;
            console.log(this.ServiceModelList);
          }
        );


          this.service.mainModelList()
          .subscribe(
            data => {
              this.mainModelList = data;
              console.log(this.mainModelList);
            }
          );
      
  

          }

          addRow() {
            // alert('addrow index '+index);
            this.lineDetailsArray().push(this.lineDetailsGroup());
            
          }
        
          RemoveRow(index) {
            if (index===0){
        
            }
            else {
              this.lineDetailsArray().removeAt(index);
            }
          
          }

          onOptionsSelectedModel(mainModel){
              // alert(mainModel)
            
            if(mainModel !=null){
            this.orderManagementService.VariantSearchFn(mainModel)
            .subscribe(
              data => {
                this.VariantSearch = data;
                console.log(this.VariantSearch);
                this.mcpItemMappingForm.patchValue({
                  serviceModel:this.VariantSearch[0].serviceModel,
                  fuelType:this.VariantSearch[0].fuelType,
              
                });
              }
            );
            }else{}

          }

          onOptionsSelectedVariant(modelVariant){
            // alert(modelVariant);
            this.serviceModel=null;this.fuelType=null;
            this.service.variantDetailsList(modelVariant)
            .subscribe(
              data => {
                this.variantDetailsList = data;
                console.log(this.variantDetailsList);
                
                this.mcpItemMappingForm.patchValue({
                  serviceModel:this.variantDetailsList.serviceModel,
                  fuelType:this.variantDetailsList.fuelType,
                  
  
                });
              }
               );
  
            }

           // ===============================================================================

 

 
  
  
 


  onOptionMcpItemIdSelectedSingle(itemNum:any) {

    this.mcpItemMappingForm.get('model').reset();
    this.mcpItemMappingForm.get('serviceModel').reset();
    this.mcpItemMappingForm.get('fuelType').reset();
    this.mcpItemMappingForm.get('itemType').reset();
    this.mcpItemMappingForm.get('itemName').reset();
    this.mcpItemMappingForm.get('quantity').reset();
    this.mcpItemMappingForm.get('erpCode').reset();

    //  alert('item function :'+ itemNum);
      let selectedValue = this.mcpItemList.find(v => v.itemNumber === itemNum);
     
      if( selectedValue != undefined){
        // alert("Selected Value :"+selectedValue);
            console.log(selectedValue);
            this.itemId = selectedValue.itemId;
            this.itemNumber=selectedValue.itemNumber;
            this.itemType=selectedValue.itemType;
            this.itemName=selectedValue.itemName;
        
     } 
     if( this.itemType==='Material') 
     {
       this.showRelateItemSection=true;
       
      } else {this.showRelateItemSection=false;}


    //  else {alert ("Select proper item...")}
  }


  onOptioninvItemIdSelectedSingle(itemSegment) {
 
    //  alert('item function');
      let selectedValue = this.invItemList.find(v => v.segment == itemSegment);

      // alert('selectedValue.Item Id :' +selectedValue.itemId);
      // alert('selectedValue.Item Id :' +selectedValue.description);

      if( selectedValue != undefined){
      alert(selectedValue.itemId);
      console.log(selectedValue);
      this.erpCodeItemId = selectedValue.itemId;
      this.segment=selectedValue.segment;
    }
  }

   

  


  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

  closeAlert(){
     window.location.reload();
  }

 

 

  SearchMcpItem(mItemNum,mFtype,mSrvModel){
    mSrvModel=mSrvModel.toUpperCase();
      
    this.displayButton=false;
    // console.log(this.mcpItemMappingForm.value);
    this.service.mcpItemMappingSearch1(mItemNum,mFtype,mSrvModel,this.ouId)
      .subscribe(
        data => {
          this.lstMcpItem = data;
          //  console.log(this.lstMcpItem);
           this.mcpItemMappingForm.patchValue(this.lstMcpItem);
      
             // ----------------------------LINE DETAILS----------------------------------------
             for(let i=0; i<this.lineDetailsArray().length; i++){ 
              this.lineDetailsArray().removeAt(i); }
              this.lineDetailsArray().clear();
          
            // alert("this.lstMcpItem.mcpRelatedItemList.length >>"+this.lstMcpItem.mcpRelatedItemList.length);
             var control = this.mcpItemMappingForm.get('mcpRelatedItemList') as FormArray;
             for (let i=0; i<this.lstMcpItem.mcpRelatedItemList.length;i++) 
              {
                var mcpRelatedItemList:FormGroup=this.lineDetailsGroup();
                control.push(mcpRelatedItemList);

                // alert(this.lstMcpItem.mcpRelatedItemList[i].relatedItem);
                var item=this.lstMcpItem.mcpRelatedItemList[i].relatedItem;
                let selectedValue = this.invItemList.find(v => v.segment == item);
                // if( selectedValue != undefined){

                (control.controls[i]).patchValue(
                  {
                    uom: selectedValue.uom,
                    itemDescription: selectedValue.description,
                    itemCategory: selectedValue.categoryId.attribute1,
                    // relatedItemId: selectedValue.itemId,
                    itemName:selectedValue.segment,
                  }
                ); }

              this.mcpItemMappingForm.get('mcpRelatedItemList').patchValue(this.lstMcpItem.mcpRelatedItemList);
              // this.mcpItemMappingForm.patchValue(this.lstMcpItem);
            // ----------------------------------------------------------------------------
     
        });

        this.mcpItemMappingForm.get('itemNumber').disable();
        this.mcpItemMappingForm.get('model').disable();
        this.mcpItemMappingForm.get('fuelType').disable();
        this.mcpItemMappingForm.get('quantity').disable();
        this.mcpItemMappingForm.get('erpCode').disable();

      }


 //////////////////////////////////////////////////////////////////////////
 getInvItemId1($event) {
  // alert ("getInvItemId")
 let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
 this.userList2 = [];

 if (userId.length > 2) {
   if ($event.timeStamp - this.lastkeydown1 > 200) {
     this.userList2 = this.searchFromArray1(this.invItemList, userId);
   }
 }
}

 getInvItemId($event) {
  //  alert ("getInvItemId")
  let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
  this.userList2 = [];

  if (userId.length > 2) {
    if ($event.timeStamp - this.lastkeydown1 > 200) {
      this.userList2 = this.searchFromArray1(this.invItemList, userId);
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

////////////////////////////////////////  line Item ////////////////////////////
    onOptioninvItemIdSelectedLine(item, index) {
    
      // alert('item function-'+item + " index ="+index);
        let selectedValue = this.invItemList.find(v => v.segment == item);
        if( selectedValue != undefined){
        // alert('Item Id :' +selectedValue.itemId);
        console.log(selectedValue);
        
        var arrayControl = this.mcpItemMappingForm.get('mcpRelatedItemList').value
        var patch = this.mcpItemMappingForm.get('mcpRelatedItemList') as FormArray;
        // this.itemType = arrayControl[index].itemType
        // alert(this.itemType)
        // this.itemId = selectedValue.itemId;
        // console.log(this.invItemId, this.taxCat);
        (patch.controls[index]).patchValue(
          {
            uom: selectedValue.uom,
            itemDescription: selectedValue.description,
            itemCategory: selectedValue.categoryId.attribute1,
            relatedItemId: selectedValue.itemId,
            itemName:selectedValue.segment,
          }
        );
     
      }
    }

/////////////////////////////////////////////////////////////////////////////////
        UpdateMainPartDetails() {

          alert(" Testing mainpart")
          var partMainId =this.erpCodeItemId;
          var partMain=this.mcpItemMappingForm.get('erpCode').value;
          var patch = this.mcpItemMappingForm.get('mcpRelatedItemList') as FormArray;
          // alert ("this.lineDetailsArray.length :"+this.lineDetailsArray().length);

          for (let i = 0; i <  this.lineDetailsArray().length ; i++) 
          {
            patch.controls[i].patchValue({mainPartId:partMainId});
            patch.controls[i].patchValue({mainPart:partMain});
        
          }
          }
        


        transeData1(val) {
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.divisionId;
          // delete val.locId;
          delete val.locName;
          // delete val.ouId;
          delete val.deptId;
          delete val.orgId;
          delete val.emplId;
          delete val.itemDisc;
          delete val.itemDesc;
          delete val.itemDisc;
          delete val.invItemId;
          delete val.segment;
          delete val.relatedItem;
          delete val.mcpRelatedItemList;

          return val;
        }

        transeData2(val) {
          delete val.loginArray;
          delete val.loginName;
          delete val.ouName;
          delete val.divisionId;
          // delete val.locId;
          delete val.locName;
          // delete val.ouId;
          delete val.deptId;
          delete val.orgId;
          delete val.emplId;
          delete val.itemDisc;
          delete val.itemDesc;
          delete val.itemDisc;
          delete val.invItemId;
          delete val.segment;
          delete val.relatedItem;
          // delete val.mcpRelatedItemList;

          return val;
        }

        newMast() {

          if( this.itemType==='Material')  {
            alert ("in...material post...");
            this.UpdateMainPartDetails()
            const formValue: IMcpitemMapping =this.transeData2(this.mcpItemMappingForm.value);
            // debugger;
         
            this.service.McpItemMappingSubmitMatrl(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                      // this.mcpItemMasterForm.reset();
                this.displayButton=false;
                this.mcpItemMappingForm.disable();
              } else { if (res.code === 400) {
                  alert('Code already present in the data base');
  
                }
              } });} 
          else 
          {
            alert ("in...Labour post...");
            const formValue: IMcpitemMapping =this.transeData1(this.mcpItemMappingForm.value);
            // debugger;
            this.service.McpItemMappingSubmitLbr(formValue).subscribe((res: any) => {
            if (res.code === 200) {
              alert('RECORD INSERTED SUCCESSFUILY');
              // this.mcpItemMasterForm.reset();
              this.displayButton=false;
              this.mcpItemMappingForm.disable();
              } else { if (res.code === 400) {
                alert('Code already present in the data base');

              }
            }
          });
        }
            
        }





}



