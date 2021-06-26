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
import { trigger } from '@angular/animations';


interface IMcpPkgMaster {
  quantity:number;
  packageId:number;

  packageNumber:string;
  packageType:string;
  packageDesc:string;
  packageCategory:string;
  fuelType:string;
  startDate:Date;
  endDate:Date;
  fromDays:number;
  toDays:number;
  fromKms:number;
  toKms:number;
  validPeriod:number;
  validKm:number;
  itemNumber:string;

   searchByPkgNumber:string;
   searchByPkgType:string;
   searchByFuelType:string;
   
  }

@Component({
  selector: 'app-mcp-package-master',
  templateUrl: './mcp-package-master.component.html',
  styleUrls: ['./mcp-package-master.component.css']
})
export class McpPackageMasterComponent implements OnInit {

  mcpPackageMasterForm : FormGroup;

          public OUIdList           : Array<string> = [];
          public ItemTypeList1      :Array<string> = [];
          public FuelTypeList       :Array<string> = [];
          public McpPackageTypeList :Array<string> = [];
          public McpPackageCategoryList :Array<string> = [];
          public McpPackageList:Array<string> = [];
          


          lstcomments: any;
          mcpItemList: any[];

          loginName:string;
          loginArray:string;
          name:string;
          ouName : string;
          locId: number;
          locName : string;
          orgId:number;
          ouId :number;
          deptId:number; 
        // emplId :number;
          public emplId =6;

          description : string; 
          packageId:number;
  
          itemId : number;  
          itemNumber:string;
          itemDescription : string ;
          itemName :string;
          segmentName:string;
          priceDesc:string;
          segment :string;

          packageNumber:string;
          packageType:string;
          packageDesc:string;
          packageCategory:string;
          fuelType:string;
          public startDate;
          endDate:Date;
          fromDays:number;
          toDays:number;
          fromKms:number;
          toKms:number;
          validPeriod:number;
          validKm:number;
          quantity:number=1;

          userList2: any[] = [];
          lastkeydown1: number = 0;
          showItemSearch=false;
          display1=true;

          //////////////////////////////////
          headerValidation=false;
          lineValidation=false;
          duplicateLineItem=false;
          displayInactive = true;
          Status1: any;
          inactiveDate: Date;
          display = true;
          displayButton = true;
          //////////////////////////////////
          searchByPkgNumber:string;
          searchByPkgType:string;
          searchByFuelType:string;
          srlNo:number=0;

     
          // public codeCombinationId=2079;
          // public reason='IC001';
          // public transSourceTypeId=17;
          // public locatorId=999
          // public subInventoryCode='SP'


        constructor(private service: MasterService,private orderManagementService:OrderManagementService,private  fb: FormBuilder, private router: Router) {
          this.mcpPackageMasterForm = fb.group({ 

            loginArray:[''],
            loginName:[''],
            ouName :[''],
            locId:[''],
            locName :[''],
            ouId :[],
            deptId :[],
            emplId:[''],
            orgId:[''],

            packageId:[],
            packageNumber:[],
            packageType:[],
            packageDesc:[],
            packageCategory:[],
            fuelType:[],
            startDate:[new Date()],
            endDate:[],
            fromDays:[],
            toDays:[],
            fromKms:[],
            toKms:[],
            validPeriod:[],
            validKm:[],

            searchByPkgNumber:[],
            searchByPkgType:[],
            searchByFuelType:[],

            ssPackageItemDtlsList: this.fb.array([this.lineDetailsGroup()])   

          });
        }

        lineDetailsGroup() {
          return this.fb.group({
            packageDtlsId:[''],
            itemId :['', [Validators.required]],  
            itemNumber:['', [Validators.required]], 
            itemDesc :['', [Validators.required]],   
            itemType:['', [Validators.required]],   
            quantity :['', [Validators.required]],  
            packageNumber:[],
            fuelType:[],
            ouId:[],
         
           });
        }
      
       lineDetailsArray() :FormArray{
          return <FormArray>this.mcpPackageMasterForm .get('ssPackageItemDtlsList')
        }

        get f() { return this.mcpPackageMasterForm.controls; }

        mcpPackageMaster(mcpPackageMasterForm:any) {  }

          ngOnInit(): void 
          {
            this.name=  sessionStorage.getItem('name');
            this.loginArray=sessionStorage.getItem('divisionName');
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


            this.service.itemTypeList()
            .subscribe(
            data => {
              this.ItemTypeList1 = data;
              console.log(this.ItemTypeList1);
            }
          );

          this.service.fuelTypeList()
          .subscribe(
          data => {
            this.FuelTypeList = data;
            console.log(this.FuelTypeList);
          }
        );

          this.service.McpPackageTypeList()
          .subscribe(
          data => {
            this.McpPackageTypeList = data;
            console.log(this.McpPackageTypeList);
          }
        );

        

        this.service.McpPackageCategoryList()
        .subscribe(
        data => {
          this.McpPackageCategoryList = data;
          console.log(this.McpPackageCategoryList);
        }
      );

        this.service.mcpItemList()
        .subscribe(
          data => {
            this.mcpItemList = data;
            console.log(this.mcpItemList);
            console.log(this.mcpItemList[0].itemId);
            
          }
        );

        
          // this.service.mcpPkgNumberList()
          //   .subscribe(
          //     data => {
          //       this.McpPackageList = data;
          //       console.log(this.McpPackageList);
          //     }
          //   );
  
      }


     // ===============================================================================

     validateQty(index: any){
   
      var qtyLineArr = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value;
      var lineQty = qtyLineArr[index].quantity;
      
      // alert("qty validation-index ,qnty >> " +index +","+lineQty);
  
      if (lineQty <=0 ) 
      {
         alert ("Invalid Quantity.Quantity should be above 0")
  
         var patch = this.mcpPackageMasterForm.get('ssPackageItemDtlsList') as FormArray;
         patch.controls[index].patchValue({quantity:''})
      }
    }

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
    let matches = [];
    // alert("in search array")
    for (let i = 0; i < arr.length; i++) {
      // var itemName=arr[i].itemNumber;
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

 //======================================================================
 onOptionmcpItemIdSelected(itemId :any, index) {
   
    let selectedValue = this.mcpItemList.find(v => v.itemNumber == itemId);
    if( selectedValue != undefined){
 
    console.log(selectedValue);
    
    var arrayControl = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value
    var patch = this.mcpPackageMasterForm.get('ssPackageItemDtlsList') as FormArray;
    // var lineItemNumberCurr=arrayControl[index].itemNumber;

    this.CheckForDuplicateLineItem(selectedValue.itemId,index)

    
    

    if(this.duplicateLineItem ==false) {

          this.itemId = selectedValue.itemId;
          (patch.controls[index]).patchValue(
            {
              itemDesc: selectedValue.itemName,
              itemType: selectedValue.itemType,
              itemId: selectedValue.itemId,
              // itemNumber:selectedValue.itemNumber,
            });
      
            } 
      }
  }

  // ======================================================================

 addRow(index) {

  // alert("Addrow duplicate item status :"+this.duplicateLineItem);
  if(this.duplicateLineItem ===false) {
   
  this.CheckLineValidations(index);

  if (this.lineValidation) 
    {
    
        this.lineDetailsArray().push(this.lineDetailsGroup());
      
    }
  } else {alert("Duplicate Line Item Found : Remove Duplicate line and Proceed..." + this.duplicateLineItem);
}
}



RemoveRow(index) {
  if (index===0){

  }
  else {
    this.lineDetailsArray().removeAt(index);
  }

}


// searchMast() {
//   this.service.getMcpPackageSearch()
//     .subscribe(
//       data => {
//         this.lstcomments = data;
//         console.log(this.lstcomments);
//       }
//     );
//    }


   SearchByPkgFuelType(pType:any,fType:any){
    // alert ("Package Type : "+pType+ " Fuel Type : "+fType);
    const formValue: IMcpPkgMaster = this.mcpPackageMasterForm.value
    if (formValue.searchByPkgType===undefined || formValue.searchByPkgType===null)
    {
        alert ("PACKAGE TYPE: Select Package Type");
        return;
     } 
     if (formValue.searchByFuelType===undefined || formValue.searchByFuelType===null)
     {
         alert ("FUEL TYPE: Select Fuel Type");
         return;
      } 

        this.service.getMcpPackageSearchNew1(pType ,fType)
        .subscribe(
        data => {
          this.lstcomments = data;
          alert("Records Found : "+ this.lstcomments.length);
          console.log(this.lstcomments);

        } ); 
         
       }


       SearchByPkgNoFuelType(pkgNo:any,fType:any){
        alert ("Package No : "+pkgNo+ " Fuel Type : "+fType);
        const formValue: IMcpPkgMaster = this.mcpPackageMasterForm.value
       
         if (formValue.searchByFuelType===undefined || formValue.searchByFuelType===null)
         {
             alert ("FUEL TYPE: Select Fuel Type");
             return;
         } 

         if (formValue.searchByPkgNumber===undefined || formValue.searchByPkgNumber===null)
         {
             alert ("PACKAGE NUMBER: Enter Correct Package Number");
             return;
         } 

    
            this.service.getMcpPackageSearchNew2(pkgNo ,fType)
            .subscribe(
            data => {
              this.lstcomments = data;
              alert("Records Found : "+ this.lstcomments.length);
              console.log(this.lstcomments);
    
            } ); 
             
           }

     

   Select1(packageId: number) {
       
    this.mcpPackageMasterForm.reset();
    // this.mviewFlag=1;
    // alert( "mviewFlag :" +this.mviewFlag);
    let select = this.lstcomments.find(d => d.packageId === packageId);
    if (select) {
      this.mcpPackageMasterForm.patchValue(select);
      this.packageId = select.packageId;
      this.displayButton = false;
      }
  }

   // ============================================================

   Select(pkgId: any) {
    this.mcpPackageMasterForm.reset();
    this.display1= false;
    let select = this.lstcomments.find(d => d.packageId === pkgId);
    // console.log(select.ssPackageItemDtlsList[0]);
    // alert(this.lineDetailsArray.length);
    for(let i=0; i<this.lineDetailsArray.length; i++){ 
      this.lineDetailsArray().removeAt(i);
    }

    // alert("mcpPkgDetailList LENGTH: "+ select.ssPackageItemDtlsList.length);
    if(select.ssPackageItemDtlsList.length>0){

       this.lineDetailsArray().clear();

      if (select) {

          // this.priceListType = select.priceListType+ "-" + select.priceListName;
          var control = this.mcpPackageMasterForm.get('ssPackageItemDtlsList') as FormArray;
         
          for (let i=0; i<select.ssPackageItemDtlsList.length;i++) 
            {
              var ssPackageItemDtlsList:FormGroup=this.lineDetailsGroup();
              control.push(ssPackageItemDtlsList);
            }
          }
    }
      this.packageId = select.packageId;
      // this.ouId= select.ouId;
      this.displayButton = false;
      this.display = false;
      this.showItemSearch=true;
      this.mcpPackageMasterForm.patchValue(select);
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

  //////////////////////////////////////New Button 
  transeData(val) {
    
    delete val.loginArray;
    delete val.loginName;
    delete val.locName;
    delete val.ouName;
    delete val.locId;
    // delete val.ouId;
    delete val.deptId;
    delete val.emplId;
    delete val.orgId;
   
   return val;
  }
  
    newMast() {
      
          this.checkHeaderValidations();

          if (this.headerValidation==true ) { alert("Header Validation Sucessfull...") }
          else { alert("Header Validation Failed... Please Check");  return;   }

          this.lineValidation=false;
          var pkgLineArr = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value;
          var len1=pkgLineArr.length;
          
          for (let i = 0; i < len1 ; i++) 
            {
              this.CheckLineValidations(i);
            }

            if(this.lineValidation===false ) { 
              alert("Line Validation Failed... \nPlease check all  line data fileds are updated properly..\nCheck for Duplicate Line Items..")
              return;
            }
          
        
          alert("Heder Validation : "+this.headerValidation +"\nLine Validation : "+this.lineValidation);
          
          if (this.headerValidation  && this.lineValidation ) 
          {
            alert("Data Validation Sucessfull....\nPosting data  to MCP Package Master")

            const formValue: IMcpPkgMaster =this.transeData(this.mcpPackageMasterForm.value);
            this.service.McpPackageMasterSubmit(formValue).subscribe((res: any) => {
              if (res.code === 200) {
                alert('RECORD INSERTED SUCCESSFUILY');
                this.mcpPackageMasterForm.reset();
              } else {
                if (res.code === 400) {
                  alert('ERROR WHILE INSERTING');
                  this.mcpPackageMasterForm.reset();
                }
              }
            });
          }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
    } 

    //  ------------------------Line updattion..........................
    updateMastLine() {
      alert ("Putting data  to MCP PACKAGE LINE item......")
      // const formValue: IPriceList = this.priceListMasterForm.value;
      const formValue: IMcpPkgMaster =this.transeData(this.mcpPackageMasterForm.value);
      this.service.UpdateMcpPackageMaster(formValue, formValue.packageId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFUILY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.mcpPackageMasterForm.reset();
          }
        }
      });
    };

    //  ------------------------Header updattion..........................
    updateMast() {
      
      this.checkHeaderValidations()

      if (this.headerValidation===true) {
        alert("Data Validation Sucessfull....\nPutting data  to MCP PACKAGE MASTER TABLE")
     
      const formValue: IMcpPkgMaster =this.transeData(this.mcpPackageMasterForm.value);
      this.service.UpdateMcpPackageMaster(formValue, formValue.packageId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFUILY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.mcpPackageMasterForm.reset();
          }
        }
      });
    }else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
    }

  // ============================================================
   
      // ------------------------------------VALIDATIONS-----------------------------------------
      
      checkHeaderValidations()  {
        const formValue: IMcpPkgMaster = this.mcpPackageMasterForm.value

        if (formValue.packageNumber===undefined || formValue.packageNumber===null || formValue.packageNumber.trim()==='')
        {
           this.headerValidation=false; 
           alert ("PACKAGE NUMBER : Should not be null....");
           
            return;
         } 

         if (formValue.packageDesc===undefined || formValue.packageDesc===null || formValue.packageDesc.trim()==='')
         {
            this.headerValidation=false; 
            alert ("PACKAGE DESCRIPTION : Should not be null....");
           
             return;
          } 

        if (formValue.packageCategory===undefined || formValue.packageCategory===null)
        {
            alert ("PACKAGE CATEGORY: Select Package Type");
            return;
         } 

        if (formValue.packageType===undefined || formValue.packageType===null)
        {
            this.headerValidation=false;   
            alert ("PACKAGE TYPE: Select Package Type");
            return;
         } 
         if (formValue.fuelType===undefined || formValue.fuelType===null)
         {
            this.headerValidation=false;  
            alert ("FUEL TYPE: Select Fuel Type");
             return;
          } 

         

          if (formValue.fromDays < 0  || formValue.fromDays===undefined || formValue.fromDays===null )
          {
              this.headerValidation=false;  
              alert ("FROM DAYS: Should not be below Zero");
              return;
          } 

          if (formValue.toDays < 0 || formValue.toDays <= formValue.fromDays || formValue.toDays===undefined || formValue.toDays===null )
          {
              this.headerValidation=false;  
              alert ("TO DAYS: Should be above FROM DAYS");
              return;
          } 

          if (formValue.fromKms < 0 || formValue.fromKms===undefined || formValue.fromKms===null )
          {
              this.headerValidation=false;  
              alert ("FROM KM: Should not be below Zero");
              return;
          } 

          if (formValue.toKms < 0 || formValue.toKms <= formValue.fromKms  || formValue.toKms===undefined || formValue.toKms===null )
          {
              this.headerValidation=false;  
              alert ("TO KM: Should be above FROM KMS");
              return;
          } 

          if (formValue.validPeriod <=0 || formValue.validPeriod===undefined || formValue.validPeriod===null )
          {
              this.headerValidation=false;  
              alert ("VALID PERIOD: Should  be above Zero");
              return;
          } 

          if (formValue.validKm <= 0 || formValue.validKm===undefined || formValue.validKm===null )
          {
              this.headerValidation=false;  
              alert ("VALID KM: Should  be above Zero");
              return;
          } 
          if(formValue.startDate===undefined || formValue.startDate===null ) 
          {
              this.headerValidation=false;
              alert ("START DATE: Should not be null value");
              
              return; 
           }

           if(formValue.endDate===undefined || formValue.endDate===null || formValue.endDate<=formValue.startDate ) 
           {
               this.headerValidation=false;
               alert ("END DATE: Should not be null value/grater than Start Date.");
               return; 
            }
          this.headerValidation=true;
      }

      CheckLineValidations(i) {

        // alert('addrow index '+i);
      
        var prcLineArr1 = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value;
        var lineValue1=prcLineArr1[i].itemId;
        var lineValue2=prcLineArr1[i].quantity;
        var lineValue3=prcLineArr1[i].itemNumber;
      
      
        // alert("Line Value :"+lineValue1);
         var j=i+1;
        if(lineValue1===undefined || lineValue1===null || lineValue1<0 ){
          alert("Line-"+j+ " ITEM ID/CODE :  Should not be null value/ Select valid item from the list");
          this.lineValidation=false;
          return;
        } 

        if(lineValue3===undefined || lineValue3===null || lineValue3==='' ){
          alert("Line-"+j+ " ITEM CODE :  Should not be null value/ Select valid item from the list");
          this.lineValidation=false;
          return;
        } 
      
        if(lineValue2===undefined || lineValue2===null || lineValue2<=0){
          alert("Line-"+j+ " QUANTITY :  Should  be grater than Zero");
          this.lineValidation=false;
          return;
        } 
        
        if(this.duplicateLineItem===true) {this.lineValidation=false;}else{this.lineValidation=true;}
        
      
        }



        CheckForDuplicateLineItem(mItemId,mIndex){
          var pkgLineArr = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value;
          var patch = this.mcpPackageMasterForm.get('ssPackageItemDtlsList') as FormArray;
          var len1=pkgLineArr.length;
          // alert("line item array length :"+len1 + "," +mItemId);
        
          for (let i = 0; i < len1 ; i++) 
            {
              // alert("inside for loop");
              var lineItemId=pkgLineArr[i].itemId;
               if(mIndex != i) {
               if (lineItemId===mItemId) { 
                 this.duplicateLineItem=true; 
                //  patch.controls[mIndex].patchValue({itemNumber:oldItem})
                
                 alert(lineItemId+" DUPLICATE line item. Please check  item  in Line - " +(i+1));
                //  this.lineDetailsArray().removeAt(len1);
                // alert("curr line item Id :"+lineItemId  + " Selected item Id :" +mItemId);
                 break;
                }

                }else{this.duplicateLineItem=false;}

                 this.duplicateLineItem=false;
            }
          

        }




}

