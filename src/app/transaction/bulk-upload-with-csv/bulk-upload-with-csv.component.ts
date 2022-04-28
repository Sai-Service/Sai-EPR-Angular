import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/master/master.service'
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, } from "@angular/common";
import * as xlsx from 'xlsx';


export class CsvData {
  // public id: any;
  // public min: any;
  // public max: any;
  // public score: any;
  //}
  public PO: any;
  public Part: any;
  public PartName: any;
  public HSNCode: any;
  public UOM: any;
  public Location: any;
  public Account: any;
  public SupplierInvoiceQty: any;
  public TransporterDamagedQty: any;
  public TransporterShortageQty: any;
  public TransitReceivedQty: any;
  public ActualReceivedQty: any;
  public WarehouseShortage: any;
  public WarehouseDamage: any;
  public WarehouseExcessQty: any;
  public Remark: any;
  public BaseAmount: any;
  public CESS: any;
  public UTGST: any;
  public SGSTUTGST: any;
  public CGST: any;
  public IGST: any;
  public Amount: any;
}


@Component({
  selector: 'app-bulk-upload-with-csv',
  templateUrl: './bulk-upload-with-csv.component.html',
  styleUrls: ['./bulk-upload-with-csv.component.css']
})
export class BulkUploadWithCsvComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
  public records: any[] = [];
  submitted = false;
  jsondatadisplay: any;
  public minDate = new Date();
  bulkUploadCSVForm: FormGroup;
  docType: string;
  error: string;
  deptName: any;
  poDetails: any = [];
  itemList: any = [];
  userList1: any[] = [];
  lastkeydown1: number = 0;
  public supplierCodeList: any[];
  public pricelIstList : any=[];
  public suppIdList: any;
  private sub: any;
  segment1: string;
  location: string;
  invcNo: string;
  supplierNo: string;
  userName: string;
  supplierSite: string;
  // invcDt1:Date;
  itemButton1 = true;
  priceListName:string;

  pipe = new DatePipe('en-US');
  now = new Date();
  invcDt1 = this.pipe.transform(this.now, 'dd-MM-yyyy');

  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<BulkUploadWithCsvComponent[]>;
  @ViewChild("itemButton") itemButton: ElementRef;
  
  @ViewChild("myinput") myInputField: ElementRef;

  // progress: number = 0;
  closeResetButton =true;
  dataDisplay: any;
  progress = 0;
  isVisible1: boolean = false;
  displayParamter=true;
  displaySalesErrorList=true;

  constructor(private fb: FormBuilder, private router: Router, private location1: Location, private router1: ActivatedRoute, private service: MasterService) {
    this.bulkUploadCSVForm = this.fb.group({
      deptName: ['', [Validators.required]],
      error: [],
      segment1: ['', [Validators.required]],
      file:['',[Validators.required]],
      location: ['', [Validators.required]],
      invcNo: ['', [Validators.required]],
      supplierNo: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      supplierSite: ['', [Validators.required]],
      invcDt1: ['', [Validators.required]],
      priceListName:['',Validators.required]
    })
  }
  bulkUploadCSV(bulkUploadCSVForm) { 
    this.submitted = true;
    console.log(bulkUploadCSVForm);
    if (this.bulkUploadCSVForm.invalid) {
      return;
    }
  }
  ngOnInit(): void {
   
    this.deptName = (sessionStorage.getItem('deptName'));
    this.bulkUploadCSVForm.patchValue({ location: sessionStorage.getItem('locCode') });
    this.bulkUploadCSVForm.patchValue({ userName: sessionStorage.getItem('ticketNo') })
    console.log(sessionStorage.getItem('locCode'));
    this.bulkUploadCSVForm.patchValue({username: sessionStorage.getItem('ticketNo')})
    this.displaySalesErrorList=true;

    if (sessionStorage.getItem('deptName')==='Sales'){
      this.displayParamter = true;
    }
    else{
      this.displayParamter = false; 
    }

    this.service.supplierCodeListNew()
      .subscribe(
        data1 => {
          this.supplierCodeList = data1;
          console.log(this.supplierCodeList);
          data1 = this.supplierCodeList;
        }
      );

      this.service.pricelIstListFn(Number(sessionStorage.getItem('ouId')))
      .subscribe(
        data1 => {
          this.pricelIstList = data1;
          console.log(this.pricelIstList);
        }
      );
      
    this.itemButton1 = true;
    this.myInputField.nativeElement.focus();
    // this.itemButton.nativeElement.hidden=true;
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  closeMast() {
    this.router.navigate(['admin']);
  }
  // loadAllUser() {
  //   this.allUsers = this.service.BindUser();
    // }

  uploadFile(event) {
    // alert(event)
    // event.target.disabled = true;
    this.closeResetButton=false;
    this.progress = 0;
    this.dataDisplay ='File Upload in progress....Do not refresh the Page'
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])
    // alert(this.deptName);
    if (this.deptName === 'Sales') {
      var supplierNo1 = this.supplierNo;
      console.log(this.supplierCodeList);   
      let selectedValue = this.supplierCodeList.find(v => v.suppId == supplierNo1);
      console.log(selectedValue);
      var suppNo=selectedValue.suppNo
      console.log(suppNo);
      var supplierSite = this.bulkUploadCSVForm.get('supplierSite').value;
      var userName = (sessionStorage.getItem('ticketNo'));
      var locCode = (sessionStorage.getItem('locCode'));
      this.service.bulkpouploadSales(formData,locCode,suppNo,supplierSite,userName).subscribe((res: any) => {  
       if (res.code === 200) {        
          this.poDetails = res.obj;
          this.dataDisplay ='File Uploaded Sucessfully....'
          this.closeResetButton=true;
        } else {
          if (res.code === 400) {
            alert('Error In File : \n' + res.message+'---'+ res.obj);
            this.dataDisplay ='File Uploading Failed....'
            this.closeResetButton=true;
            this.displaySalesErrorList=false
          }
        }
      });
    }
    else {
      // alert(Number(sessionStorage.getItem('divisionId')));
      if (Number(sessionStorage.getItem('divisionId')) == 1) {
        this.service.bulkpouploadSpares(formData).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.obj);
            this.dataDisplay ='File Uploaded Sucessfully....'
            this.closeResetButton=true;
          } else {
            if (res.code === 400) {
              alert('Error In File : \n' + res.obj);
              this.dataDisplay ='File Uploading Failed....'
              this.closeResetButton=true;
            }
          }
        });
      }
      else if (Number(sessionStorage.getItem('divisionId')) == 2) {
        // let location=this.bulkUploadCSVForm.get('locCode').value;
        var location = (sessionStorage.getItem('locCode'));
        var invcNo = this.bulkUploadCSVForm.get('invcNo').value;
        var priceListName =this.bulkUploadCSVForm.get('priceListName').value;
        var fileName = this.bulkUploadCSVForm.get('file').value;
        console.log(fileName);
        // indexOf
        var fileNameNew = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
        var value = fileNameNew.split('.');
        var value1 = value[0];
        // var value2 = value[1];
        // alert(value1+'---' + value2)
        var supplierNo = this.bulkUploadCSVForm.get('supplierNo').value;
        var supplierSite = this.bulkUploadCSVForm.get('supplierSite').value;
        var userName = (sessionStorage.getItem('ticketNo'));
        var invcDt2 = this.bulkUploadCSVForm.get('invcDt1').value;
        var invcDt1 = this.pipe.transform(invcDt2, 'dd-MM-yyyy');
        if (invcNo != value1){
          alert('Invoice Number & File Name missmatch... Please Confirm..!');
          this.dataDisplay ='Invoice Number & File Name missmatch....'
          this.closeResetButton=true;
          return;
        }
        // alert(location+'  '+invcNo+' '+supplierNo+' '+ supplierSite+' '+ userName+' '+ invcDt1)
        this.service.bulkpouploadSparesBajaj(formData, location, invcNo, supplierNo, supplierSite, userName, invcDt1,priceListName).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.poDetails[0] = res.obj;
            console.log(this.poDetails);
            this.dataDisplay ='File Uploaded Sucessfully....'
            this.closeResetButton=true;
          } else {
            if (res.code === 400) {
              alert(res.message);
              this.bulkUploadCSVForm.patchValue({ error: res.message })
              if (res.message.includes('101')) {
                this.itemList = res.obj;
                this.itemButton1 = false;
                this.dataDisplay ='File Uploading Failed....'
              this.closeResetButton=true;
              }
              else {
                this.itemButton1 = true;
                this.dataDisplay ='File Uploading Failed....'
                this.closeResetButton=true;
              }
            }
          }
        });
      }
     
    }
  }


  closederror(){
    window.location.reload()
  }


  routeOMAndCSPage(segment1) {
    this.router.navigate(['/OPMasterDto', segment1]);

  }

  refresh() {
    window.location.reload();
  }

  close() {
    this.location1.back();
  }


  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];

    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.supplierCodeList, userId);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };


  onSupplierCodeSelected(supp: string) {
    if (supp != null) {
      var value = supp.substr(supp.indexOf('@') + 1, supp.length);
      let selectedValue = this.supplierCodeList.find(v => v.suppNo == value);

      console.log(selectedValue, value);
      this.supplierNo = selectedValue.suppId;
      this.service.suppIdList(selectedValue.suppId, sessionStorage.getItem('ouId'))
        .subscribe(
          data => {
            this.suppIdList = data;
            if (this.suppIdList.length == 0) {
              alert('Supplier site not attached to supplier');
            } else {
              console.log(this.suppIdList);
            }
          }
        );
    }
  }


 
  

  get f() { return this.bulkUploadCSVForm.controls; }
  
  //  uploadCSVFile($event: any): void {
  uploadCSVFile(event:any): void {
    event.target.disabled = true;
    let text = [];
    //let files = $event.srcElement.files;
    if (this.isValidCSVFile(this.fileInput.nativeElement.files[0])) {
      //let input = $event.target;
      let reader = new FileReader();
      //  reader.readAsText(input.files[0]);
      reader.readAsText(this.fileInput.nativeElement.files[0])
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
       this.uploadFile(event);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
    setTimeout(() => {
      event.target.disabled = false;
     }, 60000);
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileInput.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData() {
    this.jsondatadisplay = JSON.stringify(this.records);
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.PO = curruntRecord[0].trim();
        csvRecord.Part = curruntRecord[1].trim();
        csvRecord.PartName = curruntRecord[2].trim();
        csvRecord.HSNCode = curruntRecord[3].trim();
        csvRecord.UOM = curruntRecord[4].trim();
        csvRecord.Location = curruntRecord[5].trim();
        csvRecord.Account = curruntRecord[6].trim();
        csvRecord.SupplierInvoiceQty = curruntRecord[7].trim();
        csvRecord.TransporterDamagedQty = curruntRecord[8].trim();
        csvRecord.TransporterShortageQty = curruntRecord[9].trim();
        csvRecord.TransitReceivedQty = curruntRecord[10].trim();
        csvRecord.ActualReceivedQty = curruntRecord[11].trim();
        csvRecord.WarehouseShortage = curruntRecord[12].trim();
        csvRecord.WarehouseDamage = curruntRecord[13].trim();
        csvRecord.WarehouseExcessQty = curruntRecord[14].trim();
        csvRecord.Remark = curruntRecord[15].trim();
        csvRecord.BaseAmount = curruntRecord[16].trim();
        csvRecord.CESS = curruntRecord[17].trim();
        csvRecord.UTGST = curruntRecord[18].trim();
        csvRecord.SGSTUTGST = curruntRecord[19].trim();
        csvRecord.CGST = curruntRecord[20].trim();
        csvRecord.IGST = curruntRecord[21].trim();
        csvRecord.Amount = curruntRecord[22].trim();
        csvArr.push(csvRecord);
      }
      return csvArr;
    }

    
  }
}