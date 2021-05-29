// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Validators } from '@angular/forms';
// import { MasterService } from '../master.service';
 
// interface IJaiRegime{
// regimeCode:string;
// regimeName:string;
// regimeType:string;
// startDate:Date;
// endDate:Date;
// status:string;
// regimeId:number;
// }

// @Component({
//   selector: 'app-jay-regime-master',
//   templateUrl: './jay-regime-master.component.html',
//   styleUrls: ['./jay-regime-master.component.css']
// })
// export class JaiRegimeMasterComponent implements OnInit {
//   jaiRegimeMasterForm: FormGroup;
//   regimeCode:string;
//   regimeName:string;
//   regimeType:string;
//   startDate:Date;
//   endDate:Date;
//   regimeId:number;
//   submitted = false;
//   public status ="Active"; 
//   displayInactive = true;
//   Status1: any;
//   inactiveDate: Date;
//   display = true;
//   displayButton = true;
//   lstcomments: any[];
//   public minDate = new Date();
//   // public maxDate = new Date();
//   public  regimeTypeList : Array<string> = [];
//   public statusList : Array<string> = [];

// constructor(private service : MasterService, private fb: FormBuilder, private router: Router) {
//     this.jaiRegimeMasterForm = fb.group({
//       regimeCode: ['', [Validators.required, Validators.maxLength(7)]],
//       regimeName: ['', [Validators.required]],
//       regimeType: ['', [Validators.required]],
//       startDate: ['', [Validators.required]],
//       endDate:['',[Validators.nullValidator]],
//       status:['', [Validators.required]],
//       regimeId:[''],
//     });
//    }


//   get f() { return this.jaiRegimeMasterForm.controls; }

//   ngOnInit(): void {

//     this.service.regimeTypeLisFunt()
//       .subscribe(
//         data => {
//           this.regimeTypeList = data;
//           console.log(this.regimeTypeList);
//         }
//       );

//       this.service.statusList()
//       .subscribe(
//         data => {
//           this.statusList = data;
//           console.log(this.statusList);
//         }
//       );
//   }

//   jaiRegimeMaster(jaiRegimeMaster: any){
//   }

//   //////////////////////////////////////Search Button 

//   searchMast() {
//     this.service.getJaiRegimeSearch()
//       .subscribe(
//         data => {
//           this.lstcomments = data;
//           console.log(this.lstcomments);
//         }
//       );
//   }

//   resetMast() {
//     window.location.reload();
//   }

//   closeMast() {
//     this.router.navigate(['admin']);
//   }
// //////////////////////////////////////New Button 
//   newMast() {
//     const formValue: IJaiRegime =this.jaiRegimeMasterForm.value;
//     this.service.JaiRegimeMasterSubmit(formValue).subscribe((res: any) => {
//       if (res.code === 200) {
//         alert('RECORD INSERTED SUCCESSFULLY');
//         this.jaiRegimeMasterForm.reset();
//       } else {
//         if (res.code === 400) {
//           alert('Code already present in the data base');
//           this.jaiRegimeMasterForm.reset();
//         }
//       }
//     });
//   }
  

 
//   Select(regimeId: number) {
//     let select = this.lstcomments.find(d => d.regimeId === regimeId);
//     if (select) {
//       this.jaiRegimeMasterForm.patchValue(select);
//       this.displayButton = false;
//       this.display = false;
//     }
//   }
//   updateMast() {
//     const formValue: IJaiRegime = this.jaiRegimeMasterForm.value;
//     this.service.UpdateJaiRegimeById(formValue, formValue.regimeId).subscribe((res: any) => {
//       if (res.code === 200) {
//         alert('RECORD UPDATED SUCCESSFULLY');
//         window.location.reload();
//       } else {
//         if (res.code === 400) {
//           alert('ERROR OCCOURED IN PROCEESS');
//           this.jaiRegimeMasterForm.reset();
//         }
//       }
//     });
//   };

//   onOptionsSelected(event: any) {
//     this.Status1 = this.jaiRegimeMasterForm.get('status').value;
//     // alert(this.Status1);
//     if (this.Status1 === 'Inactive') {
//       this.displayInactive = false;
//       this.endDate = new Date();
//     }
//     else if (this.Status1 === 'Active') {
//       this.jaiRegimeMasterForm.get('endDate').reset();
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MasterService } from '../master.service';
 
interface IJaiRegime{
regimeCode:string;
regimeName:string;
regimeType:string;
startDate:Date;
endDate:Date;
status:string;
regimeId:number;
}

@Component({
  selector: 'app-jay-regime-master',
  templateUrl: './jay-regime-master.component.html',
  styleUrls: ['./jay-regime-master.component.css']
})
export class JaiRegimeMasterComponent implements OnInit {
  jaiRegimeMasterForm: FormGroup;
  regimeCode:string;
  regimeName:string;
  regimeType:string;
  startDate:Date;
  endDate:Date;
  regimeId:number;
  submitted = false;
  public status ="Active"; 
  displayInactive = true;
  Status1: any;
  inactiveDate: Date;
  display = true;
  displayButton = true;
  lstcomments: any[];
  public minDate = new Date();
  // public maxDate = new Date();
  public  regimeTypeList : Array<string> = [];
  public statusList : Array<string> = [];

constructor(private service : MasterService, private fb: FormBuilder, private router: Router) {
    this.jaiRegimeMasterForm = fb.group({
      regimeCode: ['', [Validators.required, Validators.maxLength(7)]],
      regimeName: ['', [Validators.required]],
      regimeType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate:['',[Validators.nullValidator]],
      status:['', [Validators.required]],
      regimeId:[''],
    });
   }


  get f() { return this.jaiRegimeMasterForm.controls; }

  ngOnInit(): void {

    this.service.regimeTypeLisFunt()
      .subscribe(
        data => {
          this.regimeTypeList = data;
          console.log(this.regimeTypeList);
        }
      );

      this.service.statusList()
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        }
      );
  }

  jaiRegimeMaster(jaiRegimeMaster: any){
  }

  //////////////////////////////////////Search Button 
  Select(regimeId: number) {
    // alert ('regimeid='+regimeId)
    let select = this.lstcomments.find(d => d.regimeId === regimeId);
    if (select) {
      this.jaiRegimeMasterForm.patchValue(select);
       this.regimeId = select.regimeId;
      this.displayButton = false;
      this.display = false;
    }
  }
  searchMast() {
    this.service.getJaiRegimeSearch()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log(this.lstcomments);
        }
      );
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }
//////////////////////////////////////New Button 
  newMast() {
    const formValue: IJaiRegime =this.jaiRegimeMasterForm.value;
    this.service.JaiRegimeMasterSubmit(formValue).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD INSERTED SUCCESSFULLY');
        this.jaiRegimeMasterForm.reset();
      } else {
        if (res.code === 400) {
          alert('Code already present in the data base');
          this.jaiRegimeMasterForm.reset();
        }
      }
    });
  }
  
 
  
  
  updateMast() {
    const formValue: IJaiRegime = this.jaiRegimeMasterForm.value;
    this.service.UpdateJaiRegimeById(formValue, formValue.regimeId).subscribe((res: any) => {
      if (res.code === 200) {
        alert('RECORD UPDATED SUCCESSFULLY');
        window.location.reload();
      } else {
        if (res.code === 400) {
          alert('ERROR OCCOURED IN PROCEESS');
          this.jaiRegimeMasterForm.reset();
        }
      }
    });
  };

  onOptionsSelected(event: any) {
    this.Status1 = this.jaiRegimeMasterForm.get('status').value;
    // alert(this.Status1);
    if (this.Status1 === 'Inactive') {
      this.displayInactive = false;
      this.endDate = new Date();
    }
    else if (this.Status1 === 'Active') {
      this.jaiRegimeMasterForm.get('endDate').reset();
      this.displayInactive=true;
    }
  }


 



}
