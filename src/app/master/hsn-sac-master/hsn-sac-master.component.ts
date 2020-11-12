// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-hsn-sac-master',
//   templateUrl: './hsn-sac-master.component.html',
//   styleUrls: ['./hsn-sac-master.component.css']
// })
// export class HsnSacMasterComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
import * as $ from 'jquery';
// import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';

interface IhsnsacMaster{
  codeId:number;
  codeType:string;
  status:string;
  endDate:Date;
  hsnsaccode:string;
  description:string;
  startdate:Date;
  
}




@Component({
  selector: 'app-hsn-sac-master',
  templateUrl: './hsn-sac-master.component.html',
  styleUrls: ['./hsn-sac-master.component.css']
})
export class HsnSacMasterComponent implements OnInit {
  hsnsacMasterForm:FormGroup;
  submitted = false;
  codeId:number;
  codeType:string;
  // status:string;
  endDate:Date;
  hsnsaccode:string;
  description:string;
  startdate:Date;
  public status = "Active";
  Status1: any;
  lstcomments: any[];
  displayInactive = true;
  display = true;
  public minDate = new Date();
  public maxDate = new Date();
  public statusList: Array<string> = [];


  editField: string;
  personList: Array<any> = [];

  // awaitingPersonList: Array<any> = [
  //   { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
  //   { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
  //   { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
  //   { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
  //   { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  // ];



  private newAttribute: any = {};

  

  constructor(private fb: FormBuilder, private router: Router, private service: MasterService) { 
    this.hsnsacMasterForm = fb.group({
      // itemRows: this.fb.array([this.inItemRows()]),
      codeId:[],
      codeType:['', [Validators.required]],
      status:['', [Validators.required]],
      // caseRows: this.fb.array([this.initCaseRows()])
      endDate:[],
      hsnsaccode:['', [Validators.required]],
      description:['', [Validators.required]],
      startdate:['', [Validators.required]],
      

    })
  }

  // initCaseRows() {
  //   return this.fb.group({
  //     endDate:[],
  //     hsnsaccode:['', [Validators.required]],
  //     description:['', [Validators.required]],
  //     startdate:['', [Validators.required]],
  //   });
  // }

  get f() { return this.hsnsacMasterForm.controls; }

  ngOnInit(): void {

    // $(document).ready(function () {
    //   $('#dtBasicExample').DataTable();
    //   $('.dataTables_length').addClass('bs-select');
    // });
    this.service.getHsnSacSearch()
    .subscribe(
      data => {
        this.lstcomments = data;
        console.log(this.lstcomments);
        // this.hsnsacMasterForm.patchValue(this.lstcomments);
      }
    );
  }
  
    transHSNData(val) {
      delete val.codeId;
      // delete val.codeType;
      // delete val.status;
      return val;
    }
  
    buttonClicked() {
      const formValue: IhsnsacMaster = this.transHSNData(this.hsnsacMasterForm.value);
      this.service.HSNSACMasterSubmit(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('RECORD INSERTED SUCCESSFUILY');    
          // this.hsnsacMasterForm.reset();
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('Data already present in the data base');
            this.hsnsacMasterForm.reset();
          }
        }
      });
    }

  

  hsnsacMaster(hsnsacMasterForm: any) {

  }

  onOptionsSelected(event: any) {
    this.Status1 = this.hsnsacMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.hsnsacMasterForm.get('endDate').reset();
    }
  }
  transData(val) {
    delete val.emplId;
    return val;
  }


  // updateList(id: number, property: string, event: any) {
  //   const editField = event.target.textContent;
  //   this.personList[id][property] = editField;
  // }

  // remove(id: any) {
  //   this.awaitingPersonList.push(this.personList[id]);
  //   this.personList.splice(id, 1);
  // }

  // add() {
  //   if (this.awaitingPersonList.length > 0) {
  //     const person = this.awaitingPersonList[0];
  //     this.personList.push(person);
  //     this.awaitingPersonList.splice(0, 1);
  //   }
  // }

  // changeValue(id: number, property: string, event: any) {
  //   this.editField = event.target.textContent;
  // }
  add() {
      this.personList.push(this.newAttribute)
      this.newAttribute={};
    }
    Select(codeId: number) {
      // alert(companyCode);
      let select = this.lstcomments.find(d => d.codeId === codeId);
      if (select) {
        this.display = false;
    //     const formValue: IhsnsacMaster =this.hsnsacMasterForm.value;
    // this.service.UpdateHSNMasterById(formValue).subscribe((res: any) => {
    //   if (res.code === 200) {
    //     alert('RECORD UPDATED SUCCESSFUILY');
    //     window.location.reload();
    //   } else {
    //     if (res.code === 400) {
    //       alert('ERROR OCCOURED IN PROCEESS');
    //       this.hsnsacMasterForm.reset();
    //     }
      // }
    // });

      }
    }
    enddate(){
      alert("hi");
      this.display = false;
      
      }
      transDataUpdate(val) {
       
        val.endDate={"status": "Inactive", "endDate":new Date()}
        // delete val.status;
        // delete val.endDate;
        return val;
      }
      UpDateEndDate( codeId: number){
        // alert(codeId);
        let select = this.lstcomments.find(d => d.codeId === codeId);
      if (select) {

        const formValue: IhsnsacMaster =this.transDataUpdate(select);
      this.service.UpdateHSNMasterById(formValue).subscribe((res: any) => {
        if (res.code === 200) {
          alert('ENDDATE UPDATED SUCCESSFUILY');
          window.location.reload();
        } else {
          if (res.code === 400) {
            alert('ERROR OCCOURED IN PROCEESS');
            this.hsnsacMasterForm.reset();
          }
        }
      });
    }
      }
    
    // onKey(event: any) {
    //   this.display = false;
    //       const formValue: IhsnsacMaster =this.hsnsacMasterForm.value;
    // this.service.UpdateHSNMasterById(formValue).subscribe((res: any) => {
    //   if (res.code === 200) {
    //     alert('RECORD UPDATED SUCCESSFUILY');
    //     window.location.reload();
    //   } else {
    //     if (res.code === 400) {
    //       alert('ERROR OCCOURED IN PROCEESS');
    //       this.hsnsacMasterForm.reset();
    //     }
    //   }
    // });
    // }
  }


