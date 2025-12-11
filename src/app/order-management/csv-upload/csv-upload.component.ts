import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent implements OnInit {
 selectedFile: File | null = null;
  csvData: any[] = [];
  headers: any;
  ServerUrl: any;

  
  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders();
    this.ServerUrl = AppConstants.ServerUrl;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // uploadCSV() {
  //   if (!this.selectedFile) {
  //     alert("Please select a file first.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", this.selectedFile);   
  //   this.http.put(this.ServerUrl+'/VehAddInfo/upload', formData)
  //     .subscribe({
  //       next: (response) => {
  //         console.log("Upload success:", response);
  //         alert("File uploaded successfully!");
  //       },
  //       error: (err) => {
  //         console.error("Upload error:", err);
  //         alert("File upload ");
  //       }
  //     });
  // }

    uploadCSV() {
    if (!this.selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", this.selectedFile);
  
    this.http.put(this.ServerUrl + '/VehAddInfo/upload', formData)
      .subscribe({
        next: (response: any) => {
          console.log("Upload success:", response);
  
          alert("File uploaded successfully! Rows updated: " + response.obj);
        },
        error: (err) => {
          console.error("Upload error:", err);
          alert("Upload failed!");
        }
      });
  }

  parseCSV(csvText: string): string[][] {
    return csvText
      .trim()
      .split('\n')
      .map(row => row.split(','));
  }

    closeMast() {
    this.router.navigate(['admin']);
  }

  resetMast() {
    window.location.reload();
  }

}
