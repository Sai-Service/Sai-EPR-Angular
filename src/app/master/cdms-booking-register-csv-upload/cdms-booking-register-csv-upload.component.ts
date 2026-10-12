import { Component } from '@angular/core';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { ServiceService } from '../../service/service.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-cdms-booking-register-csv-upload',
  templateUrl: './cdms-booking-register-csv-upload.component.html',
  styleUrls: ['./cdms-booking-register-csv-upload.component.css']
})
export class CdmsBookingRegisterCsvUploadComponent implements OnInit {
 csvUploadForm: FormGroup;
  createdBy: string | undefined | null;
  updatedBy: string | undefined | null;
  ouId!: number;
  locId!: number;
  selectedFile: File | null = null;
  isUploading: boolean = false;
  bookingList: any[] = [];
  isSearching: boolean = false;
  isUpdatingEcomId: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service:MasterService) {
    this.csvUploadForm = fb.group({
      createdBy: [],
      updatedBy: [],
      ouId: [],
      locId: []
    })
  }

  ngOnInit(): void {
    this.createdBy = (sessionStorage.getItem('ticketNo'));
    this.updatedBy = (sessionStorage.getItem('ticketNo'));
    this.csvUploadForm.patchValue({ createdBy: sessionStorage.getItem('ticketNo') });
    this.csvUploadForm.patchValue({ updatedBy: sessionStorage.getItem('ticketNo') });
    this.locId = Number(sessionStorage.getItem('locId'));
    this.ouId = Number(sessionStorage.getItem('ouId'));
  }

  get f() { return this.csvUploadForm.controls; }
  csvUploadFrm(csvUploadForm: any) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.selectedFile = null;
      return;
    }
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select only CSV file.');
      event.target.value = '';
      this.selectedFile = null;
      return;
    }
    this.selectedFile = file;
  }

  csvUpload(): void {
    if (!this.selectedFile) {
      alert('Please select CSV file.');
      return;
    }
    if (!this.createdBy) {
      alert('Created By is not available.');
      return;
    }
    if (!this.locId) {
      alert('Location ID is not available.');
      return;
    }
    if (!this.ouId) {
      alert('OU ID is not available.');
      return;
    }
    this.isUploading = true;
    const formData = new FormData();

    formData.append('file', this.selectedFile);

    const params =
      '?createdBy=' + encodeURIComponent(this.createdBy) +
      '&locId=' + this.locId +
      '&ouId=' + this.ouId;

    console.log('Uploading File:', this.selectedFile.name);
    console.log('createdBy:', this.createdBy);
    console.log('locId:', this.locId);
    console.log('ouId:', this.ouId);

    this.service.uploadBookingCsv(formData, params).subscribe({
      next: (response: any) => {
        this.isUploading = false;
        console.log('Upload Response:', response);
        if (response && response.code === 200) {
          alert(
            response.message ||
            'Booking Register CSV uploaded successfully.'
          );
          this.selectedFile = null;
        } else {
          alert(
            response?.message ||
            'CSV upload failed.'
          );
        }
      },
      error: (error: any) => {
        this.isUploading = false;
        console.error('Upload Error:', error);
        if (error?.error?.message) {
          alert(error.error.message);
        } else {
          alert('Error while uploading CSV file.');
        }
      }
    });
  }

  searchBooking(): void {

    if (!this.createdBy) {
      alert('Created By is not available.');
      return;
    }

    if (!this.locId) {
      alert('Location ID is not available.');
      return;
    }

    this.isSearching = true;

    const params =
      '?createdBy=' + encodeURIComponent(this.createdBy) +
      '&locId=' + this.locId;

    console.log('Search Params:', params);

    this.service.getBookingData(params).subscribe({
      next: (response: any) => {

        this.isSearching = false;

        console.log('Booking Search Response:', response);

        if (response && response.code === 200) {

          this.bookingList = response.obj || [];

          if (this.bookingList.length === 0) {
            alert('No booking records found.');
          }

        } else {

          this.bookingList = [];

          alert(
            response?.message ||
            'No booking records found.'
          );
        }
      },

      error: (error: any) => {

        this.isSearching = false;
        this.bookingList = [];

        console.error('Booking Search Error:', error);

        if (error?.error?.message) {
          alert(error.error.message);
        } else {
          alert('Error while fetching booking records.');
        }
      }
    });
  }

  updateEcomId(): void {

    if (this.isUpdatingEcomId) {
      return;
    }

    this.isUpdatingEcomId = true;

    console.log('Calling Update Ecom-Id API...');

    this.service.updateEcomId().subscribe({

      next: (response: any) => {

        this.isUpdatingEcomId = false;

        console.log('Update Ecom-Id Response:', response);

        if (response && response.code === 200) {

          alert(
            response.message ||
            'Ecom-Id updated successfully.'
          );

          // Refresh booking data after successful update
          // this.searchBooking();

        } else {

          alert(
            response?.message ||
            'Ecom-Id update failed.'
          );
        }
      },

      error: (error: any) => {

        this.isUpdatingEcomId = false;

        console.error('Update Ecom-Id Error:', error);

        if (error?.error?.message) {

          alert(error.error.message);

        } else {

          alert('Error while updating Ecom-Id.');
        }
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
