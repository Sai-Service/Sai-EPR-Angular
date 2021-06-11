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
          itemDescription : string ;
          itemName :string;
          segmentName:string;
          priceDesc:string;
          segment :string;

          packageNumber:number;
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
          quantity:number=1;

          userList2: any[] = [];
          lastkeydown1: number = 0;
          showItemSearch=false;
          display1=true;

          //////////////////////////////////
          displayInactive = true;
          Status1: any;
          inactiveDate: Date;
          display = true;
          displayButton = true;
          //////////////////////////////////

     
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
            startDate:[],
            endDate:[],
            fromDays:[],
            toDays:[],
            fromKms:[],
            toKms:[],
            validPeriod:[],
            validKm:[],

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
 
  //  alert('item function-'+itemId +" index ="+index);
  
    let selectedValue = this.mcpItemList.find(v => v.itemNumber == itemId);
    if( selectedValue != undefined){
    // alert('Item Id :' +selectedValue.itemId);
    // return;

    console.log(selectedValue);
    
    var arrayControl = this.mcpPackageMasterForm.get('ssPackageItemDtlsList').value
    var patch = this.mcpPackageMasterForm.get('ssPackageItemDtlsList') as FormArray;
    
    this.itemId = selectedValue.itemId;

    (patch.controls[index]).patchValue(
      {
        itemDesc: selectedValue.itemName,
        itemType: selectedValue.itemType,
        itemId: selectedValue.itemId,
        // itemNumber:selectedValue.itemNumber,
      }
    );

  }
}
// ======================================================================

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


searchMast() {
  this.service.getMcpPackageSearch()
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
      }
    );
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

      // alert ("Posting data  to PL mater......")
      // const formValue: IPriceList =this.priceListMasterForm.value;
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
      alert ("Putting data  to MCP PACKAGE header.part .....")
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

  // ============================================================





}

