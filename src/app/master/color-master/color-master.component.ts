import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../master.service';
import { CommonModule } from '@angular/common';
// import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-color-master',
  templateUrl: './color-master.component.html',
  styleUrls: ['./color-master.component.css']
})
export class ColorMasterComponent implements OnInit {
colorForm!: FormGroup;
  divisionId!: number;
  locId!: number;
  ouId!: number;
  modelList: any[] = [];
  variantList: any[] = [];
  filteredVariantList: any[] = [];
  colorList: any[] = [];
  createdBy!:number;
  variantDisabled = true;
  colorDisabled = true;

  constructor(private fb: FormBuilder, private http: HttpClient,private service: MasterService,private router: Router) {
      this.colorForm = this.fb.group({
        modelName: [''],
        variantName: [''],
        colorName: [''],
        divisionId: [],
        locId: [],
        ouId: [],
        createdBy:[]
      });
  }

  ngOnInit(): void {

    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.locId = Number(sessionStorage.getItem('locId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
    this.createdBy = Number(sessionStorage.getItem('emplId'));

    this.loadModels();

    this.loadColors();
  }

  loadModels() {
    this.service.getModels().subscribe((res: any) => this.modelList = res);
  }

  // loadVariants() {
  //   this.service.getVariants().subscribe((res: any) => this.variantList = res);
  // }

  loadColors() {
    // this.service.getColours().subscribe((res: any) => this.colorList = res);
    this.service.getColours().subscribe((res: any) => {
  this.colorList = res.sort((a:any, b:any) =>
    a.code.localeCompare(b.code)
  );
});

  }

  onModelChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;

  this.colorForm.patchValue({ variantName: '', colorName: '' });
  this.filteredVariantList = [];
  this.variantDisabled = true;
  this.colorDisabled = true;

  if (!value) return;

  this.service.getVariantsByModel(value).subscribe((res: any) => {
  this.filteredVariantList = res.obj.sort((a:any, b:any) =>
    a.variant.localeCompare(b.variant)
  );
  this.variantDisabled = this.filteredVariantList.length === 0;
});

}


  onVariantChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value) {
      this.colorDisabled = false;
    }
  }

  close() { this.router.navigate(['admin']); }

  refresh() { window.location.reload(); }

  onSave() {
  if (!this.colorForm.valid) return;
  const formValue = this.colorForm.value;

  const selectedVariant = this.filteredVariantList
    .find(v => v.variantId == formValue.variantName);

  const payload = {
    variantId: this.colorForm.value.variantName,
    colorCode: this.colorForm.value.colorName,
    //variantId: formValue.variantName,
    variant: selectedVariant?.variant,   // <-- Required field
    //colorCode: formValue.colorName,
    divisionId: this.divisionId,
    locId: this.locId,
    ouId: this.ouId,

   createdBy: Number(sessionStorage.getItem('emplId'))
    
  };

  console.log("Payload Going -> ", payload);

  this.service.insertModelColor(payload).subscribe({
    next: (res: any) => {
      alert(res.message || 'Saved Successfully!');
      console.log(res);
    },
    error: (err) => {
      console.error(err);
      alert('Failed to save!');
    }
  });
}

onSearch() {
  const formValue = this.colorForm.value;

  const mainModel = Number(formValue.modelName);
  const variantId = formValue.variantName ? Number(formValue.variantName) : null;
  const colorCode = formValue.colorName ? Number(formValue.colorName) : null;

  if (!mainModel) {
    alert('Please select Model');
    return;
  }

  this.service.getVariantModelColor(variantId, mainModel, colorCode)
    .subscribe({
      next: (res: any) => {
        if (res.code === 200 && res.obj) {
          this.searchResult = Array.isArray(res.obj) ? res.obj : [res.obj];
          this.showTable = true;
        } else {
          this.searchResult = [];
          this.showTable = false;
          alert('No Data Found');
        }
      },
      error: (err) => {
        console.error('Backend Error:', err);
        alert('Search Failed');
      }
    });
}

  searchResult: any[] = [];
  showTable = false;

  
// exportToExcel() {
//   if (!this.searchResult || this.searchResult.length === 0) {
//     alert("No data available to export");
//     return;
//   }

//   // Convert table data to Excel sheet
//   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.searchResult);

//   // Create Workbook
//   const workbook: XLSX.WorkBook = {
//     Sheets: { 'ModelColorData': worksheet },
//     SheetNames: ['ModelColorData']
//   };

//   // Generate Excel buffer
//   const excelBuffer: any = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array'
//   });

//   // Save File
//   const fileData: Blob = new Blob([excelBuffer], {
//     type: 'application/octet-stream'
//   });

//   saveAs(fileData, 'ModelColorData.xlsx');
// }

// exportToExcel() {
//   if (!this.searchResult || this.searchResult.length === 0) {
//     alert("No data available to export");
//     return;
//   }

//   const worksheet = XLSX.utils.json_to_sheet(this.searchResult);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'ModelColorData');

//   XLSX.writeFile(workbook, 'ModelColorData.xlsx');
// }
}



