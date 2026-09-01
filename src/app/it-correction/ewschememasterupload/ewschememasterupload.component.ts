import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItCorrectionService } from '../it-correction.service';

@Component({
  selector: 'app-ewschememasterupload',
  templateUrl: './ewschememasterupload.component.html',
  styleUrls: ['./ewschememasterupload.component.css']
})
export class EwschememasteruploadComponent implements OnInit {

  selectedFile: File | null = null;
  isUploading: boolean = false;
  isDownloading: boolean = false;
  uploadMessage: string = '';
  uploadMessageType: string = ''; // 'success' | 'error'

  constructor(private itCorrectionService: ItCorrectionService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadMessage = '';
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file to upload';
      this.uploadMessageType = 'error';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('loginName', sessionStorage.getItem('ticketNo') || '');

    this.isUploading = true;
    this.uploadMessage = '';

    this.itCorrectionService.uploadEwSchemeMaster(formData).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.uploadMessage = 'File uploaded successfully';
        this.uploadMessageType = 'success';
        this.selectedFile = null;
      },
      error: (err) => {
        this.isUploading = false;
        this.uploadMessage = 'Upload failed. Please try again.';
        this.uploadMessageType = 'error';
        console.error('Upload error:', err);
      }
    });
  }

  onDownload(): void {
    this.isDownloading = true;

    this.itCorrectionService.downloadEwSchemeMaster().subscribe({
      next: (blob: Blob) => {
        this.isDownloading = false;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'EwSchemeMaster.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.isDownloading = false;
        this.uploadMessage = 'Download failed. Please try again.';
        this.uploadMessageType = 'error';
        console.error('Download error:', err);
      }
    });
  }

  resetMast() {
    window.location.reload();
  }

  closeMast() {
    this.router.navigate(['admin']);
  }

}

