import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface IOrderType {

  transactionTypeId:number;
 

  divisionId:number;
  ouId :number;
  locId:number;
  deptId : number;
  orderCategoryCode : string;
  invoiceSource:string;
  transactionTypeName :string;
  transactionTypeDescription:string
  primaryPriceListId :number;
  secondaryPriceListId:number;
  status:string;
  startDate:Date;
  endDate:Date;


 }
@Component({
  selector: 'app-order-type-master',
  templateUrl: './order-type-master.component.html',
  styleUrls: ['./order-type-master.component.css']
})
export class OrderTypeMasterComponent implements OnInit {
  orderTypeMasterForm : FormGroup;
  pipe = new DatePipe('en-US');
  public minDate = new Date();
   
    public DivisionIDList : Array<string>=[];
    public OUIdList: Array<string> = [];
    public DepartmentList: Array<string> = [];
    public statusList: Array<string> = [];
    public PriceListIdList : Array<string> = [];
    public locIdList: Array<string> = [];
    public OrderCategoryList: Array<string> = [];
    public InvSourceList: Array<string> = [];
    lstcomments: any[];


    transactionTypeId: number;
    divisionId : number; division:string;
    ouId :number;
    deptId:number; attribute1:string;
    locId:number;
    public status = "Active";
    orderCategoryCode:string;
    invoiceSource:string; attribute3 : string;
    primaryPriceListId :number;
    secondaryPriceListId:number;
    transactionTypeName :string;
    transactionTypeDescription:string
    remark :string;

    loginName:string;
    loginArray:string;
    name:string;
    ouName : string;
    // locId: number;
    // locName : string;
    // ouId :number;
    // deptId:number; 
    // divisionId:number;
   // emplId :number;
    public emplId =6;


    checkValidation=false; 
    displayInactive = true;
    Status1: any;
    inactiveDate: Date;
    display = true;
    displayButton = true;
    showOrg=false;

    // startDate:Date;
    // now = Date.now();
    startDate = this.pipe.transform(Date.now(), 'y-MM-dd');

    endDate:Date;

    get f() { return this.orderTypeMasterForm.controls; }

    orderTypeMaster(orderTypeMasterForm:any) {  }

    constructor(private service: MasterService, private fb: FormBuilder, private router: Router)  
    {
      this.orderTypeMasterForm = fb.group({
      
        divisionId:[],
        division:[],
        ouId :[],
        deptId :[],
        locId:[],
        status :['', [Validators.required]],
        primaryPriceListId :[],
        secondaryPriceListId :[],
        transactionTypeId :[],
        orderCategoryCode :[],
        transactionTypeName :['', [Validators.required]],
        transactionTypeDescription :['', [Validators.required]],
        remark :[],
        startDate: ['', [Validators.required]],
        endDate:['',[Validators.nullValidator]],
        invoiceSource:['',[Validators.nullValidator]],
        attribute1:[],
        attribute2:[],
        attribute3:[],

        loginArray:[''],
        loginName:[''],
        ouName :[''],
        locName :[''],
        // locId:[''],
        // ouId :[],
        // deptId :[],
        // divisionId:[],
        emplId:[''],

      });
    }




      ngOnInit(): void 
      {
        this.name=  sessionStorage.getItem('name');
        this.loginArray=sessionStorage.getItem('divisionName');
        this.division=sessionStorage.getItem('divisionName');
        this.divisionId=Number(sessionStorage.getItem('divisionId'));
        this.loginName=sessionStorage.getItem('name');
        this.ouName = (sessionStorage.getItem('ouName'));
        this.ouId=Number(sessionStorage.getItem('ouId'));
        this.locId=Number(sessionStorage.getItem('locId'));
        // this.locName=(sessionStorage.getItem('locName'));
        this.deptId=Number(sessionStorage.getItem('dept'));
        // this.emplId= Number(sessionStorage.getItem('emplId'));
        console.log(this.loginArray);
        console.log(this.locId);
        
        


            this.service.OUIdList()
            .subscribe(
              data => {
                this.OUIdList = data;
                console.log(this.OUIdList);
              }
            );

            // this.service.getLocationSearch()
            // .subscribe(
            //   data => {
            //     this.locIdList = data;
            //     console.log(this.locIdList);
            //   }
            // );

           
        
            // this.service.DivisionIDList()
            // .subscribe(
            //   data => {
            //     this.DivisionIDList = data;
            //     console.log(this.DivisionIDList);
            //   }
            // );


            this.service.statusList()
            .subscribe(
              data => {
                this.statusList = data;
                console.log(this.statusList);
              }
            );
            
            this.service.DepartmentList()
            .subscribe(
              data => {
                this.DepartmentList = data;
                console.log(this.DepartmentList);
              }
            );

            this.service.PriceListIdList(this.ouId,this.divisionId)
            .subscribe(
              data => {
                this.PriceListIdList = data;
                console.log(this.PriceListIdList);
              }
            );


            this.service.OrderCategoryList()
            .subscribe(
              data => {
                this.OrderCategoryList = data;
                console.log(this.OrderCategoryList);
              }
            );

            this.service.InvSourceList()
            .subscribe(
              data => {
                this.InvSourceList = data;
                console.log(this.InvSourceList);
              }
            );




      }

      onOuIdSelected(ouId : any ){
        // alert('ouId id =' +ouId + 'index ='+ index);
          if (ouId > 0) {
            this.showOrg=false;
    
              this.service.getLocationSearch1(ouId)
              .subscribe(
                data => {
                  this.locIdList = data;
                  console.log(this.locIdList);
                }
              );
              this.showOrg=true;
          }
          else {
            this.showOrg=false;
          }
      }
    

      onOptionsSelected(event: any) {
        this.Status1 = this.orderTypeMasterForm.get('status').value;
        // alert(this.Status1);
        if (this.Status1 === 'Inactive') {
          this.displayInactive = false;
          this.endDate = new Date();
        }
        else if (this.Status1 === 'Active') {
          this.orderTypeMasterForm.get('endDate').reset();
          this.displayInactive=true;
        }
      }

      transeData(val) {
        // delete val.priceDesc;
        // delete val.itemDescription;
        // delete val.priceListId;
       return val;
      }

      resetMast() {
        window.location.reload();
      }
    
      closeMast() {
        this.router.navigate(['admin']);
      }

      Select(transactionTypeId: number) {
        // alert ('OrderTypeId='+transactionTypeId);
        // this.orderTypeMasterForm.get('ouId').reset();
        this.orderTypeMasterForm.get('locId').reset();
        this.orderTypeMasterForm.reset();

        let select = this.lstcomments.find(d => d.transactionTypeId === transactionTypeId);
        if (select) {
          this.orderTypeMasterForm.patchValue(select);
          this.transactionTypeId = select.transactionTypeId;
          this.ouId = select.ouId.ouId;
          this.displayButton = false;
          this.showOrg=false;
          this.display = false;
        }}
      

      searchMast() {
        this.service.getOrderTypeSearch()
          .subscribe(
            data => {
              this.lstcomments = data;
              console.log(this.lstcomments);
            }
          );

         
      }
      newMast() {

        this.CheckDataValidations();

        if (this.checkValidation===true) {
          alert("Data Validation Sucessfull....\nPosting data  to ORDER TYPE TABLE")

        const formValue: IOrderType =this.orderTypeMasterForm.value;
        // const formValue: IOrderType =this.transeData(this.orderTypeMasterForm.value);
        this.service.OrderTypeMasterSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFULLY');
            // this.orderTypeMasterForm.reset();
            this.orderTypeMasterForm.disable();
          } else {
            if (res.code === 400) {
              alert('Code already present in the data base');
              // this.orderTypeMasterForm.reset();
            }
          }
        });
      } else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
      }
  
  
      updateMast() {

        this.CheckDataValidations();

        if (this.checkValidation===true) {

        alert("Data Validation Sucessfull....\nPutting data to ORDER TYPE MASTER  TABLE")

        const formValue: IOrderType = this.orderTypeMasterForm.value;
        // const formValue: IOrderType =this.transeData(this.orderTypeMasterForm.value);
        // alert("OrderType -Transactiontypeid:" +formValue.transactionTypeId);
        // alert("OrderType -formvalue:" +formValue);
        // this.service.UpdateOrderTypeMasterById(formValue, formValue.transactionTypeId).subscribe((res: any) => {
          this.service.UpdateOrderTypeMasterById1(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            // window.location.reload();
            this.orderTypeMasterForm.disable();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
             
            }
          }
        });
      }  else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }

      }


      CheckDataValidations(){
    
        const formValue: IOrderType = this.orderTypeMasterForm.value;

        // alert("ou id : "+formValue.ouId);

        if (formValue.ouId===undefined || formValue.ouId===null )
        {
          this.checkValidation=false; 
          alert ("OPERATING UNIT : Should not be null....");
          return;
        } 

        if (formValue.locId===undefined || formValue.locId===null )
        {
          this.checkValidation=false; 
          alert ("LOCATION : Should not be null....");
          return;
        } 

        if (formValue.deptId===undefined || formValue.deptId===null )
        {
          this.checkValidation=false; 
          alert ("DEPT : Should not be null....");
          return;
        } 

       
         if (formValue.orderCategoryCode===undefined || formValue.orderCategoryCode===null)
        {
           this.checkValidation=false; 
           alert ("ORDER CATEGORY: Should not be null....");
            return;
         } 

          if (formValue.invoiceSource===undefined || formValue.invoiceSource===null )
          {
              this.checkValidation=false; 
              alert ("INVOICE SOURCE : Should not be null....");
              return;
            } 

            if (formValue.transactionTypeName===undefined || formValue.transactionTypeName===null || formValue.transactionTypeName.trim()==='')
            {
                this.checkValidation=false; 
                alert ("TRANSACTION TYPE: Should not be null....");
                return;
              } 

              
            if (formValue.transactionTypeDescription===undefined || formValue.transactionTypeDescription===null || formValue.transactionTypeDescription.trim()==='')
            {
                this.checkValidation=false; 
                alert ("TRANSACTION DESCRIPTION: Should not be null....");
                return;
              } 

              if (formValue.primaryPriceListId===undefined || formValue.primaryPriceListId===null)
              {
                 this.checkValidation=false; 
                 alert ("PRIMARY PRICE LIST: Should not be null....");
                  return;
               } 

               if (formValue.secondaryPriceListId===undefined || formValue.secondaryPriceListId===null)
               {
                  this.checkValidation=false; 
                  alert ("SECONDARY PRICE LIST: Should not be null....");
                   return;
                } 

                if(formValue.status===undefined || formValue.status===null ) 
                {
                    this.checkValidation=false;
                    alert ("STATUS: Should not be null value");
                    return; 
                  }
               
            if(formValue.startDate===undefined || formValue.startDate===null ) 
            {
                this.checkValidation=false;
                alert ("START DATE: Should not be null value");
                return; 
              }
   
              if(formValue.status==='Inactive' ) {
                if(formValue.endDate===undefined || formValue.endDate===null ) 
                {
                    this.checkValidation=false;
                    alert ("END DATE: Should not be null value");
                    return; 
                  } 
                }
                this.checkValidation=true

      }

      onSelectionPrimePL(event){
        if(event>0){
        var x=this.orderTypeMasterForm.get('primaryPriceListId').value;
        var y=this.orderTypeMasterForm.get('secondaryPriceListId').value;
        if(x===y) {alert ("Primary And Secondary Price List Should not be Same...");
         this.orderTypeMasterForm.get('primaryPriceListId').reset();
        return;
      }}}

      onSelectionSecPL(event){
        if(event>0){
        var x=this.orderTypeMasterForm.get('primaryPriceListId').value;
        var y=this.orderTypeMasterForm.get('secondaryPriceListId').value;
        if(x===y) {alert ("Primary And Secondary Price List Should not be Same...");
         this.orderTypeMasterForm.get('secondaryPriceListId').reset();
        return;
      }}}

}

