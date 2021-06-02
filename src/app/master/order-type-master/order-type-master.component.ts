import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

interface IOrderType {

  transactionTypeId:number;
  orderCategoryCode : string;
  deptId : number;
  divisionId:number;
  ouId :number;
 }
@Component({
  selector: 'app-order-type-master',
  templateUrl: './order-type-master.component.html',
  styleUrls: ['./order-type-master.component.css']
})
export class OrderTypeMasterComponent implements OnInit {
  orderTypeMasterForm : FormGroup;
   
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

    displayInactive = true;
    Status1: any;
    inactiveDate: Date;
    display = true;
    displayButton = true;
    showOrg=false;

    startDate:Date;
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

      });
    }




      ngOnInit(): void 
      {

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

           
        
            this.service.DivisionIDList()
            .subscribe(
              data => {
                this.DivisionIDList = data;
                console.log(this.DivisionIDList);
              }
            );


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

            this.service.PriceListIdList()
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
        alert ('OrderTypeId='+transactionTypeId);
        // this.orderTypeMasterForm.get('ouId').reset();
        this.orderTypeMasterForm.get('locId').reset();
        this.orderTypeMasterForm.reset();

        let select = this.lstcomments.find(d => d.transactionTypeId === transactionTypeId);
        if (select) {
          this.orderTypeMasterForm.patchValue(select);
          this.transactionTypeId = select.transactionTypeId;
          this.displayButton = false;
          this.showOrg=false;
          this.display = false;
          this.ouId = select.ouId.ouId;
          // this.divisionId=select.ouId.divisionId.divisionId;
        }
        alert('transtypeid='+transactionTypeId+"  OU :" + this.ouId );
        alert(" divisionid: "+this.divisionId);
        alert(" InvoiceSource: "+this.invoiceSource);
      }
      

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

        alert ("Posting data  to PL mater......")
        const formValue: IOrderType =this.orderTypeMasterForm.value;
        // const formValue: IOrderType =this.transeData(this.orderTypeMasterForm.value);
        this.service.OrderTypeMasterSubmit(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD INSERTED SUCCESSFULLY');
            this.orderTypeMasterForm.reset();
          } else {
            if (res.code === 400) {
              alert('Code already present in the data base');
              this.orderTypeMasterForm.reset();
            }
          }
        });
      }
  
  
      updateMast() {
        alert ("Putting data  to PL mater......")
        const formValue: IOrderType = this.orderTypeMasterForm.value;
        // const formValue: IOrderType =this.transeData(this.orderTypeMasterForm.value);
        alert("OrderType -Transactiontypeid:" +formValue.transactionTypeId);
        alert("OrderType -formvalue:" +formValue);
        // this.service.UpdateOrderTypeMasterById(formValue, formValue.transactionTypeId).subscribe((res: any) => {
          this.service.UpdateOrderTypeMasterById1(formValue).subscribe((res: any) => {
          if (res.code === 200) {
            alert('RECORD UPDATED SUCCESSFULLY');
            window.location.reload();
          } else {
            if (res.code === 400) {
              alert('ERROR OCCOURED IN PROCEESS');
              this.orderTypeMasterForm.reset();
            }
          }
        });
      };
}

