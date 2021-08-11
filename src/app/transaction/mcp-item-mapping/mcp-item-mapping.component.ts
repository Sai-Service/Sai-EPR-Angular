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
       // emplId :number;
        public emplId =6;
        userList2: any[] = [];
        lastkeydown1: number = 0;

        invItemId:number;
        segment:string;

        itemId:number;
        itemNumber: string;
        itemName:string;
        itemDesc:string;
        itemType:string;
        itemDisc:number;
        startDate:Date;
        endDate:Date;

        model:string;
        variant:string;
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


            
            itemid:[],
            itemNumber:[],
            itemName:[],
            itemDesc:[],
            itemType:[],
            itemDisc:[],
            startDate:[],
            endDate:[],

            model:[],
            variant:[],
            serviceModel:[],
            fuelType:[],
            quantity:[],
            erpCode:[],

            invItemId:[],
            segment:[],

            sitemNumber:[],
            sfuelType:[],
            sserviceModel:[],

            mcpRelatedItemList: this.fb.array([this.lineDetailsGroup()])   
          });
        }
    
        lineDetailsGroup() {
          return this.fb.group({
            itemId :['', [Validators.required]],    
            itemName:['', [Validators.required]],
            itemDescription: ['', [Validators.required]],
            itemCategory: ['', [Validators.required]],
            segment:[],
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
            // this.emplId= Number(sessionStorage.getItem('emplId'));
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

  getInvItemId($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.mcpItemList, userId);
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

  onOptionMcpItemIdSelectedSingle(itemNum:any) {
 
    // this.mcpItemMappingForm.get('itemType').reset();
    // this.mcpItemMappingForm.get('itemDesc').reset();

    //  alert('item function :'+ itemNum);
      let selectedValue = this.mcpItemList.find(v => v.itemNumber === itemNum);
     
      if( selectedValue != undefined){
        // alert("Selected Value :"+selectedValue);
            console.log(selectedValue);
            this.itemId = selectedValue.itemId;
            this.itemNumber=selectedValue.itemNumber;
            this.itemType=selectedValue.itemType;
            this.itemDesc=selectedValue.itemName;
        
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
      if( selectedValue != undefined){
      alert(selectedValue.itemId);
      console.log(selectedValue);
      this.invItemId = selectedValue.itemId;
      // this.searchItemName=selectedValue.description;
      this.segment=selectedValue.segment;
    }
  }

  getInvItemId1($event) {
    let userId = (<HTMLInputElement>document.getElementById('invItemIdFirstWay')).value;
    this.userList2 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList2 = this.searchFromArray1(this.invItemList, userId);
      }
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

  ////////////////////////////////////////  line Item ////////////////////////////
  onOptioninvItemIdSelectedLine(itemId, index) {
 
    // alert('item function- line item'+itemId);
     let selectedValue = this.invItemList.find(v => v.segment == itemId);
     if( selectedValue != undefined){
    //  alert('Item Id :' +selectedValue.itemId);
     console.log(selectedValue);
     
     var arrayControl = this.mcpItemMappingForm.get('mcpMappingitemLine').value
     var patch = this.mcpItemMappingForm.get('mcpMappingitemLine') as FormArray;
     // this.itemType = arrayControl[index].itemType
     // alert(this.itemType)
     this.itemId = selectedValue.itemId;
     // console.log(this.invItemId, this.taxCat);
     (patch.controls[index]).patchValue(
       {
         uom: selectedValue.uom,
         itemDescription: selectedValue.description,
         itemCategory: selectedValue.categoryId.attribute1,
         itemId: selectedValue.itemId,
         itemName:selectedValue.segment,
       }
     );
 
   }
 }

 

  SearchMcpItem(mItemNum,mFtype,mSrvModel){
    alert("Search Item ..WIP..."+mItemNum +","+mFtype+","+mSrvModel);
    // this.mcpEnquiryForm.reset();
    // var xEnq = mEnqNo.toUpperCase();
    // this.addFlag=false;
    this.displayButton=false;

    console.log(this.mcpItemMappingForm.value);
    this.service.mcpItemMappingSearch1(mItemNum,mFtype,mSrvModel,this.ouId)
      .subscribe(
        data => {
          this.lstMcpItem = data;
        
          console.log(this.lstMcpItem);
          this.mcpItemMappingForm.patchValue(this.lstMcpItem);

             // ----------------------------LINE DETAILS----------------------------------------
             for(let i=0; i<this.lineDetailsArray.length; i++){ 
              this.lineDetailsArray().removeAt(i);
            }

            this.lineDetailsArray().clear();
            alert("this.lstMcpItem.mcpRelatedItemList.length >>"+this.lstMcpItem.mcpRelatedItemList.length);
            var control = this.mcpItemMappingForm.get('mcpRelatedItemList') as FormArray;
            for (let i=0; i<this.lstMcpItem.mcpRelatedItemList.length;i++) 
              {
                var mcpRelatedItemList:FormGroup=this.lineDetailsGroup();
                control.push(mcpRelatedItemList);
              }
                  
            this.mcpItemMappingForm.get('mcpRelatedItemList').patchValue(this.lstMcpItem.enqDtls);
          
            
            // ----------------------------------------------------------------------------

            
          
        });
        this.mcpItemMappingForm.get('itemNumber').disable();
        this.mcpItemMappingForm.get('model').disable();
        this.mcpItemMappingForm.get('variant').disable();
        this.mcpItemMappingForm.get('fuelType').disable();
        this.mcpItemMappingForm.get('quantity').disable();
        this.mcpItemMappingForm.get('erpCode').disable();
      }


 //////////////////////////////////////////////////////////////////////////


}



