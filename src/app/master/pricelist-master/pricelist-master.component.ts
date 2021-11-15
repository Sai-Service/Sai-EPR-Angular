import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators , FormArray } from '@angular/forms';
import { MasterService } from '../master.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { now } from 'jquery';
// import { saveAs } from 'file-saver';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface IPriceList {

  // priceListId :number;
  // priceListName:string;
  // priceDesc:string;

  // status:string;
  // startDate:Date;
  
  // ouId: number; 
  // ouName : string;
  // description : string; 
  priceListType: string;
  priceListName:string;
  description:string;
  ouId:number;
  divisionId:number;
  deptId:number;
  status:string;
  priceSubType:string;
  startDate:Date;
  endDate:string;

  // priceValue:number;


  priceListHeaderId:number;
  fileName :string; 
  docType :string;

}
@Component({
  selector: 'app-pricelist-master',
  templateUrl: './pricelist-master.component.html',
  styleUrls: ['./pricelist-master.component.css']
})
export class PricelistMasterComponent implements OnInit {
  priceListMasterForm: FormGroup;

  progress = 0;
  // message = '';
  selectFile?: File;

  pipe = new DatePipe('en-US');
  now = Date.now();
  resMsg : string;
  lstMessage: any;

   
 
  fileName :string; 
  docType :string;

  priceListId :number;
  priceListName:string;
  priceListDesc:string;
  priceListType:string;
  priceSubType:string;
  priceListHeaderId : number;
  ouId: number;
  // ouName : string;
  
  deptId : number;
  description : string; 
  
  itemId : number;  
  itemDescription : string ;
  priceDesc:string;
  segment :string;

  searchBy : string;
  searchValue : string;

  startDate = this.pipe.transform(Date.now(), 'y-MM-dd');
  endDate:Date;

  upldPricelistName : string;
  public PriceListIdList : Array<string> = [];
  
  
  // startDate = this.pipe.transform(this.now, 'dd-MM-y h:mm:ss');

  // startDate= Date.now();


  showOu=false;
  showItemSearch=false;
  showPriceListLov =true;
  display=true;
  lstcomments: any;
  lstcomments1: any;
  public statusList: Array<string> = [];
  invItemList: any;
  public PriceTypeList: Array<string> = [];
  public PriceSubTypeList: Array<string> = [];
  public DepartmentList: Array<string> = [];

 
  public priceDescList  :any;

  public OUIdList: Array<string> = [];
  
  public DivisionIDList : Array<string>=[];
  public itemIdList : Array<string>=[];

  public itemNameList: any;
  public priceListNameList: any;

  // priceValue:number;

  // public emplId =6;
  // display= true;
  headerValidation=false; 
  lineValidation=false;
  enableDesc=false;
  // public status = "Active";
  status :string ='Active'
  displayInactive = true;
  Status1: any;
  display1 = true;
  displayButton = true;
  plsearch=false;

  userList2: any[] = [];
  lastkeydown1: number = 0;

  loginName:string;
  loginArray:string;
  name:string;
  ouName : string;
  locId: number;
  locName : string;
  emplId :number;
  orgId:number;
  divisionId : number;
  divisionName:string;
  primaryPriceListId:number;

  searchItemId:string;
  searchItemName :string;

  @ViewChild('fileInput') fileInput;
  message: string;

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) 
    {
      this.priceListMasterForm = fb.group({

      

      fileName:['',Validators.required],
      docType:['',Validators.required],

      loginArray:[''],
      loginName:[''],
      ouName :[''],
      locId:[''],
      locName :[''],
      emplId:[''],
      divisionId :[''],
      divisionName:[''],

      primaryPriceListId :[],
      searchItemId:[],
      searchItemName:[],
        
        priceListHeaderId: [],
        priceListType:[],
        priceSubType:[],
        deptId: [],
        ouId :[],
        status :['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate:['', [Validators.required]],
        // itemId: ['', [Validators.required]],
        description: [],
        itemDescription:[],
        priceDesc:[],
        priceListId:['', [Validators.required]],
        priceListName:['', [Validators.required]],
        searchBy:['', [Validators.required]],
        searchValue:['', [Validators.required]],
        upldPricelistName:[],

        priceListDetailList: this.fb.array([this.lineDetailsGroup()])   
      });
    }

    lineDetailsGroup() {
      return this.fb.group({ 
        priceListLineId:[''],
        itemId :['', [Validators.required]],    
        itemName:['', [Validators.required]],
        itemDescription: ['', [Validators.required]],
        itemCategory: ['', [Validators.required]],
        uom: ['', [Validators.required]],
        batchCode: ['', [Validators.required]],
        priceValue: ['', [Validators.required]],
        // startDate: ['', [Validators.required]],
        // endDate: ['', [Validators.required]],
        segment: ['', [Validators.required]],
       });
    }
  
   lineDetailsArray() :FormArray{
      return <FormArray>this.priceListMasterForm.get('priceListDetailList')
    }
   

  get f() { return this.priceListMasterForm.controls; }
  priceListMaster(priceListMasterForm:any) {  }
  

  ngOnInit(): void {


    this.name=  sessionStorage.getItem('name');
    this.loginArray=sessionStorage.getItem('divisionName');
    this.divisionName=sessionStorage.getItem('divisionName');
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
    
    //  this.service.invItemList1()
    //   .subscribe(
    //     data => {
    //       this.invItemList = data;
    //       console.log(this.invItemList);
    //     }
    //   );

 this.service.invItemListNew(sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.invItemList = data;
          console.log(this.invItemList);
        }
      );
 

    this.service.PriceListIdList()
    .subscribe(
      data => {
        this.PriceListIdList = data;
        console.log(this.PriceListIdList);
      }
    );

    this.service.OUIdList()
    .subscribe(
      data => {
        this.OUIdList = data;
        console.log(this.OUIdList);
      }
    );

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

    this.service.PriceTypeList()
    .subscribe(
      data => {
        this.PriceTypeList = data;
        console.log(this.PriceTypeList);
      }
    );

    this.service.PriceSubTypeList()
    .subscribe(
      data => {
        this.PriceSubTypeList = data;
        console.log(this.PriceSubTypeList);
      }
    );
    

    // this.service.itemIdList()
    // .subscribe(
    //   data => {
    //     this.itemIdList = data;
    //     console.log(this.itemIdList);
    //   }
    // );

  }

  

  onOptionsSelectedStatus(event: any) {
    this.Status1 = this.priceListMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.priceListMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


  

  onItemSelected(itemId: any) 
  {
      alert("ITEM ID :" + itemId);
    if(itemId>0)
    {
       this.enableDesc=false
      this.service.itemNameList(itemId)
        .subscribe(
          data => {
            this.itemNameList = data;
            console.log(this.itemNameList);
            this.priceListMasterForm.patchValue(this.itemNameList.description);
            this.itemDescription = this.itemNameList.description;
            // alert("item desc :" + this.description);
          }
        );
    }
    else {
      this.enableDesc=true;
      this.priceListMasterForm.get("description").reset();
    }
    // alert ("enable Desc="+this.enableDesc);
 }
  
  
 onPLSelected(priceListId: any) 
 {
     alert("price list ID :" + priceListId);
   
          this.service.priceDescList(priceListId)
          .subscribe(
          data => {
           this.priceDescList = data;
           console.log(this.priceDescList);
           
           this.priceListMasterForm.patchValue(this.priceDescList.priceListType);
           this.priceListMasterForm.patchValue(this.priceDescList.priceListName);
           this.priceListMasterForm.patchValue(this.priceDescList.description);
           this.priceListMasterForm.patchValue(this.priceDescList.divisionId);
           this.priceListMasterForm.patchValue(this.priceDescList.deptId);
           this.priceListMasterForm.patchValue(this.priceDescList.ouId);
           this.priceListMasterForm.patchValue(this.priceDescList.status);

           this.priceListType=this.priceDescList.priceListType;
           this.priceListName=this.priceDescList.priceListName;
           this.description=this.priceDescList.description;
           this.divisionId=this.priceDescList.divisionId;
           this.ouId=this.priceDescList.ouId;
           this.deptId=this.priceDescList.deptId;
           this.status=this.priceDescList.status;

            this.priceListMasterForm.patchValue(this.priceDescList.endDate);
            this.endDate=this.priceDescList.endDate;
            this.priceListMasterForm.patchValue(this.priceDescList.startDate);
            this.startDate=this.priceDescList.startDate;

            this.displayButton = false;
            this.display = false;
            this.plsearch=true;
     
        
          if(priceListId>0){
            this.showItemSearch=true;
            this.showPriceListLov=false
          } else {
            this.showItemSearch=false;
            // this.showPriceListLov=false
          }

          
          //  alert("PL Name : " + this.priceListName + " PL ouid:  "+this.ouId );
          //  alert( " on pl select >>"+ this.status + " Start Date: " + this.startDate  + " End Date : " + this.endDate);
          // alert("pricelist type: "+this.priceListType);
          // alert("Show item search : "+this.showItemSearch);
          


         }
       );
    
  } 



  onPLTSelected (plTypeId : string) {
    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName );
   if( plTypeId=='LOCAL') {
     this.showOu=true;
    } else {
      this.showOu=false;
    }

    // alert("price Type ID :" + plTypeId  + " PL type Name : " + plTypeName + " Show OU : " + this.showOu );

  }



  addRow(index) {
    //  alert('addrow index '+index);

     this.CheckLineValidations(index);
     if (this.lineValidation==true) 
      {
          this.lineDetailsArray().push(this.lineDetailsGroup());
      }

  }

  RemoveRow(index) {
    if (index===0){

    }
    else {
      this.lineDetailsArray().removeAt(index);
    }
  
  }

  

  ////////////////////////// Reset Button module
  resetMast() {  window.location.reload();   }

  ////////////////////////// Close Button module
  closeMast() {  this.router.navigate(['admin']);  }

  //////////////////////////////////////New Button 
  transeData(val) {
    delete val.priceDesc;
    delete val.itemDescription;
    delete val.priceListId;
    // delete val.divisionId;
    delete val.loginArray;
    delete val.loginName;
    delete val.locName;
    delete val.ouName;
    delete val.searchBy;
    delete val.searchValue;
    delete val.searchItemId;


   return val;
  }
  
    newMast() {

      this.CheckHeaderValidations();
      if (this.headerValidation==true ) { alert("Header Validation Sucessfull...") }
      else { alert("Header Validation Failed... Please Check");  return;   }

      this.lineValidation=false;
      var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
      var len1=prcLineArr.length;
      
      for (let i = 0; i < len1 ; i++) 
        {
          this.CheckLineValidations(i);
        }

        // alert("Line Validation :" + this.lineValidation);

        if(this.lineValidation===false) { 
          alert("Line Validation Failed...\nPlease check all  line data fileds are updated properly..")
          return;
        }
       
     
      alert("Heder Validation : "+this.headerValidation +"\nLine Validation : "+this.lineValidation);
      
      if (this.headerValidation  && this.lineValidation ) 
      {
        alert("Data Validation Sucessfull....\nPosting data  to PRICE LIST TABLE")
           
      const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
      this.service.PriceListMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFULLY');
          // this.priceListMasterForm.reset();
          this.priceListMasterForm.disable()
        } else {
          if (res.code === 400) {
            alert('ERROR WHILE INSERTING');
            // this.priceListMasterForm.reset();
          }
        }
      });


    }else{ alert("Data Validation Not Sucessfull....\nPosting Not Done...")  }
    }

    //  ------------------------Line updattion..........................
    updateMastLine() {

      this.lineValidation=false;
      var prcLineArr = this.priceListMasterForm.get('priceListDetailList').value;
      var len1=prcLineArr.length;
      
      for (let i = 0; i < len1 ; i++) 
        {
          this.CheckLineValidations(i);
        }
 
        if(this.lineValidation===false) { 
          alert("Line Validation Failed...\nPlease check all  line data fileds are updated properly..")
          return;
        }

        if (this.lineValidation ) 
        {
          alert("Line Validation Sucessfull....\nPutting Line data  to PRICE LIST TABLE")

  
      const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
      this.service.UpdatePriceListById(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFULLY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.priceListMasterForm.reset();
          }
        }
      });
      }else{ alert("Line Validation Not Sucessfull....\nData not Saved...")  }
    }

    //  ------------------------Header updattion..........................
    // updateMastHeader() {
    //   alert ("Putting data  to PL mater header.part .....")
    //   // const formValue: IPriceList = this.priceListMasterForm.value;
    //   const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
    //   this.service.UpdatePriceListByIdHeader(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
    //     if (res.code === 200) {
    //       alert('RECORD UPDATED SUCCESSFULLY');
    //       window.location.reload();
    //     } else {
    //       if (res.code === 400) {
    //         alert('ERROR OCCOURED IN PROCEESS');
    //         this.priceListMasterForm.reset();
    //       }
    //     }
    //   });
    // };

    //  ------------------------Header updattion..........................
    updateMastHeader() {
      
         this.CheckHeaderValidations();
        if (this.headerValidation===true) {
          alert("Data Validation Sucessfull....\nPutting data to PRICE LIST MASTER  TABLE") 

      const formValue: IPriceList =this.transeData(this.priceListMasterForm.value);
      this.service.UpdatePriceListByIdHeader(formValue, formValue.priceListHeaderId).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD UPDATED SUCCESSFUILY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.priceListMasterForm.reset();
          }
        }
      });
    } else{ alert("Data Validation Not Sucessfull....\nData not Saved...")  }
    }

  // ============================================================

  Select(priceListHeaderId: number) {
    alert(priceListHeaderId);
    this.priceListMasterForm.reset();
    this.display1= false;
   
    // let select = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    // console.log(select.priceListDetailList[0]);

    for(let i=0; i<this.lineDetailsArray.length; i++){ 
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();
   
    // if(select.priceListDetailList.length>0){

    //    

    //   if (select) {

    //       this.priceListType = select.priceListType+ "-" + select.priceListName;
        
    //       var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;
         
    //       for (let i=0; i<select.priceListDetailList.length;i++) 
    //         {
    //           var priceListDetailList:FormGroup=this.lineDetailsGroup();
    //           control.push(priceListDetailList);
    //         }
    
    //     }
    // }

    this.service.getLineDetails(priceListHeaderId)  .subscribe(
      data => {
        console.log(data);
        var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;
        for (let i = 0; i < data.length ; i++) {
          var priceListDetailList:FormGroup=this.lineDetailsGroup();
              control.push(priceListDetailList);
              this.priceListMasterForm.patchValue(data);
        }
        // this.priceListMasterForm.patchValue(data);
       var pricelistHeaderDetails= this.lstcomments;
        // let controlinv = this.priceListMasterForm.get('oeOrderLinesAllList') as FormArray;
        // (controlinv.controls[k]).patchValue({
        //   baseAmt: Math.round((data.obj.oeOrderLinesAllList[k].baseAmt + Number.EPSILON) * 100) / 100,
        //   taxAmt: Math.round((data.obj.oeOrderLinesAllList[k].taxAmt + Number.EPSILON) * 100) / 100,
        //   totAmt: Math.round((data.obj.oeOrderLinesAllList[k].totAmt + Number.EPSILON) * 100) / 100,
        //   unitSellingPrice: Math.round((data.obj.oeOrderLinesAllList[k].unitSellingPrice + Number.EPSILON) * 100) / 100,
        //   disPer: data.obj.oeOrderLinesAllList[k].disPer,
        //   taxCategoryId: data.obj.oeOrderLinesAllList[k].taxCategoryId,
        // });
      }
     
    )
   
      // this.priceListHeaderId = select.priceListHeaderId;
      this.displayButton = false;
      this.display = false;
      this.showItemSearch=true;
      // this.priceListMasterForm.patchValue(select);
    }
  


  
  searchMast() {
    // this.service.getPriceListSearch(999,this.divisionId)
    //   .subscribe(
    //     data => {
    //       this.lstcomments = data;
    //       console.log(this.lstcomments);
    //     }
    //   );

    this.service.getPriceListSearchNew(sessionStorage.getItem('ouId'),sessionStorage.getItem('divisionId'))
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }



  priceHistory(priceListId,itemId) {
    this.service.getPriceListHistorySearch(priceListId,itemId)
      .subscribe(
        data => {
          this.lstcomments1 = data;
          console.log(this.lstcomments1);
        }
      );

    alert("price history -wip -"+priceListId+","+itemId);
  }


  validatePrice(index: any){
    // alert("price validation " +index);

    var priceLineArr = this.priceListMasterForm.get('priceListDetailList').value;
    var linePrice = priceLineArr[index].priceValue;
    

    if (linePrice <=0 ) 
    {
       alert (linePrice+" << Invalid Price Rate.Price value should be above 0")

       var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
       patch.controls[index].patchValue({priceValue:''})
    }
    // return;
    
  }
  


   
  // ===============================================================================

  getInvItemId($event) {
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

  onOptioninvItemIdSelected(itemId, index) {
 
    //  alert('item function-'+itemId);
      let selectedValue = this.invItemList.find(v => v.segment == itemId);
      console.log(selectedValue);
      
      if( selectedValue != undefined){
      // alert('Item Id :' +selectedValue.itemId);
      console.log(selectedValue);
      
      var arrayControl = this.priceListMasterForm.get('priceListDetailList').value
      var patch = this.priceListMasterForm.get('priceListDetailList') as FormArray;
      // this.itemType = arrayControl[index].itemType
      // alert(this.itemType)
      this.itemId = selectedValue.itemId;
      // console.log(this.invItemId, this.taxCat);
      (patch.controls[index]).patchValue(
        {
          uom: selectedValue.uom,
          itemDescription: selectedValue.itemDescription,
          itemCategory: selectedValue.itemCategory,
          itemId: selectedValue.itemId,
          itemName:selectedValue.segment,
        }
      );
  
    }
  }

  onOptioninvItemIdSelectedSingle(itemId) {
 
    //  alert('item function');
      let selectedValue = this.invItemList.find(v => v.segment == itemId);
      if( selectedValue != undefined){
      alert(selectedValue.itemId);
      console.log(selectedValue);
      this.searchItemId = selectedValue.itemId;
      this.searchItemName=selectedValue.description;
      this.segment=selectedValue.segment;
    }
  }


  findByCode(searchBy,searchValue){
    // var arrayControl = this.priceListMasterForm.get('priceListDetailList').value
    var priceListHeaderId= this.priceListMasterForm.get('priceListHeaderId').value;
    let select1 = this.lstcomments.find(d => d.priceListHeaderId === priceListHeaderId);
    console.log('(select1.priceListDetailList) ' +select1.priceListDetailList);
    console.log(select1.priceListDetailList.length);
    var data : any=[] ;
    if(searchBy== 'ITEM DESCRIPTION'){
      for(let i=0; i<select1.priceListDetailList.length; i++){
        if(select1.priceListDetailList[i].itemDescription.includes(searchValue)){
          data.push(select1.priceListDetailList[i])
        }
      }
    }
    if(searchBy== 'ITEM CODE'){
      for(let i=0; i<select1.priceListDetailList.length; i++){
        if(select1.priceListDetailList[i].segment.includes(searchValue)){
          data.push(select1.priceListDetailList[i])
        }
      }
    }
    console.log(data);
    // let select = (select1.priceListDetailList).find(d => d.itemDescription.includes(searchValue));
    // console.log(select);
    for(let i=0; i<this.lineDetailsArray.length; i++){ 
      this.lineDetailsArray().removeAt(i);
    }
    this.lineDetailsArray().clear();
    // alert(this.lineDetailsArray.length);
    var control = this.priceListMasterForm.get('priceListDetailList') as FormArray;
    for (let i=0; i<data.length;i++) {
      var priceListDetailList:FormGroup=this.lineDetailsGroup();
      control.push(priceListDetailList);
    }
    this.priceListMasterForm.get('priceListDetailList').patchValue(data);
  }

  /////////////////////////////////////////

  // loadAllUser() {
  //   this.allUsers = this.service.BindUser();
  // }

  plUpload() {
    this.priceListMasterForm.get('upldPricelistName').reset();
    this.lstMessage=null;
    this.resMsg=null;
  }

  uploadFile() {
   
    this.progress = 0;

    var upldPlName =this.priceListMasterForm.get('upldPricelistName').value;
    var event=this.fileInput.nativeElement.files[0];
    console.log('doctype-check'+this.docType)
    let formData = new FormData();
    // formData.append('file', this.fileInput.nativeElement.files[0])
    formData.append('file', event)

      this.service.UploadExcel(formData,this.docType,upldPlName).subscribe(result => {
      this.message = result.toString();

      // if (event.type === HttpEventType.UploadProgress) {
      // this.progress = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   this.message = event.body.message;
       
      // }
      // alert ( "this.message :" + this.message);

       this.service.UploadExcel(formData,this.docType,upldPlName).subscribe((res: any) => {
   
        if (res.code === 200) {
          alert('FILE UPLOADED SUCCESSFULLY');
           this.resMsg = res.message+",  Code : "+res.code;;
           this.lstMessage=res.obj.priceListDetailList;
             
        } else {
          if (res.code === 400) {
            alert('FILE UPLOAD FAILED');
            this.resMsg = res.message +",  Code : "+res.code;
            this.lstMessage=res.obj.priceListDetailList;
          }

         

        }
      });
    } );
   
  }

  refershForm(){
    alert("....WIP");
  }

  CheckHeaderValidations(){
    
    const formValue: IPriceList = this.priceListMasterForm.value;

        if (formValue.priceListType===undefined || formValue.priceListType===null)
        {
          this.headerValidation=false; 
          alert ("PRICE LIST TYPE : Should not be null....");
            return;
        } 

        if (formValue.priceListName===undefined || formValue.priceListName===null || formValue.priceListName.trim()==='')
        {
          this.headerValidation=false; 
          alert ("PRICE LIST NAME: Should not be null....");
            return;
        } 

        if (formValue.description===undefined || formValue.description===null || formValue.description.trim()==='')
        {
            this.headerValidation=false; 
            alert ("DESCRIPTION : Should not be null....");
            return;
          } 

         if (formValue.divisionId===undefined || formValue.divisionId===null)
        {
          this.headerValidation=false; 
          alert ("DIVISION : Should not be null....");
          return;
        } 

        if (formValue.deptId===undefined || formValue.deptId===null)
        {
          this.headerValidation=false; 
          alert ("DEPT : Should not be null....");
          return;
        } 

        if (formValue.ouId===undefined || formValue.ouId===null)
        {
          this.headerValidation=false; 
          alert ("OPERATING UNIT : Should not be null....");
          return;
        } 
        
        if(formValue.status===undefined || formValue.status===null ) 
        {
            this.headerValidation=false;
            alert ("STATUS: Should not be null value");
            return; 
         }
         
        if(formValue.startDate===undefined || formValue.startDate===null ) 
        {
            this.headerValidation=false;
            alert ("START DATE: Should not be null value");
            return; 
         }

        

          if(formValue.status==='Inactive' ) {
            if(formValue.endDate===undefined || formValue.endDate===null ) 
            {
                this.headerValidation=false;
                alert ("END DATE: Should not be null value");
                return; 
              } 
            }

            if (formValue.priceSubType===undefined || formValue.priceSubType===null)
            {
              this.headerValidation=false; 
              alert ("PRICE SUB TYPE : Should not be null....");
              return;
            } 
    

       
      this.headerValidation=true

  }

  CheckLineValidations(i) {

    // alert('addrow index '+i);
  
    var prcLineArr1 = this.priceListMasterForm.get('priceListDetailList').value;
    var lineValue1=prcLineArr1[i].itemId;
    var lineValue2=prcLineArr1[i].batchCode;
    var lineValue3=prcLineArr1[i].priceValue;
  
    // alert("Line Value :"+lineValue1);
     var j=i+1;
    if(lineValue1===undefined || lineValue1===null || lineValue1==='' ){
      alert("Line-"+j+ " ITEM NUMBER :  should not be null value/ Select valid item from the list");
      this.lineValidation=false;
      return;
    } 
  
    if(lineValue2===undefined || lineValue2===null || lineValue2.trim()===''){
      alert("Line-"+j+ " BATCH CODE :  should not be null value");
      this.lineValidation=false;
      return;
    } 
  
    if(lineValue3===undefined || lineValue3===null  || lineValue3 <=0){
      alert("Line-"+j+ " PRICE :  should be above Zero");
      this.lineValidation=false;
      return;
    } 
     
    this.lineValidation=true;
  
    }


 
  
}
 