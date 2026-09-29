import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MasterService } from '../../master/master.service';
import { AppConstants } from '../../app-constants';
import { Location } from '@angular/common';


@Component({
  selector: 'app-all-manual-gate-pass',
  templateUrl: './all-manual-gate-pass.component.html',
  styleUrls: ['./all-manual-gate-pass.component.css']
})
export class AllManualGatePassComponent {
 reportForm!: FormGroup;

  isLoading = false;
  errorMessage = '';

  ServerUrl = '';
  apiUrl = '';

  public BillShipToList: any[] = [];
  public DepartmentListFn: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: MasterService,private location: Location
  ) {
    // Server URL
    this.ServerUrl = AppConstants.ServerUrl;

    // API URL
    this.apiUrl = `${this.ServerUrl}/SalesReports/SLManualGPRep`;

    // Form initialization
    this.reportForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      locId: [''],
      deptId: ['', Validators.required],
      location: ['']
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.loadDepartments();
     $("#wrapper").toggleClass("toggled");
  }

  /**
   * Load Location List
   */
  private loadLocations(): void {

    const ouId = sessionStorage.getItem('ouId') || '';

    this.service.getLocationSearch1(ouId).subscribe({
      next: (data: any) => {

        this.BillShipToList = Array.isArray(data) ? data : [];

        console.log('Location List:', this.BillShipToList);

      },

      error: (error: any) => {

        console.error('Location API Error:', error);

        this.BillShipToList = [];

        this.errorMessage =
          'Unable to load location list. Please try again.';
      }
    });
  }

  /**
   * Load Department List
   */
  private loadDepartments(): void {

    this.service.DepartmentList().subscribe({
      next: (data: any) => {

        this.DepartmentListFn = Array.isArray(data) ? data : [];

        console.log('Department List:', this.DepartmentListFn);

      },

      error: (error: any) => {

        console.error('Department API Error:', error);

        this.DepartmentListFn = [];

        this.errorMessage =
          'Unable to load department list. Please try again.';
      }
    });
  }

  /**
   * Download Manual Gate Pass Report
   */
  downloadReport(): void {

    this.errorMessage = '';

    // Form validation
    if (this.reportForm.invalid) {

      this.reportForm.markAllAsTouched();

      this.errorMessage =
        'Please select all required fields.';

      return;
    }

    const formValue = this.reportForm.getRawValue();

    // Validate From Date
    if (!formValue.fromDate) {

      this.errorMessage = 'Please select From Date.';

      return;
    }

    // Validate To Date
    if (!formValue.toDate) {

      this.errorMessage = 'Please select To Date.';

      return;
    }

    // Convert dates
    const fromDate = this.formatDate(formValue.fromDate);
    const toDate = this.formatDate(formValue.toDate);

    // Validate date range
    const from = new Date(formValue.fromDate);
    const to = new Date(formValue.toDate);

    if (from > to) {

      this.errorMessage =
        'From Date cannot be greater than To Date.';

      return;
    }

    /*
     * Location:
     *
     * If location is selected from dropdown,
     * use selected locId.
     *
     * Otherwise use sessionStorage locId.
     */
    const selectedLocId =
      formValue.locId ||
      sessionStorage.getItem('locId') ||
      '';

    /*
     * Department
     */
    const deptId = formValue.deptId || '';

    // Create API parameters
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('locId', selectedLocId)
      .set('deptId', deptId);

    console.log('Report API URL:', this.apiUrl);
    console.log('Report Parameters:', params.toString());

    // Start loader
    this.isLoading = true;

    this.http.get(this.apiUrl, {
      params: params,
      responseType: 'blob'
    }).subscribe({

      next: (response: Blob) => {

        this.isLoading = false;

        console.log('Report Response:', response);

        // Check empty response
        if (!response || response.size === 0) {

          this.errorMessage =
            'No data found for the selected criteria.';

          return;
        }

        // Create Excel Blob
        const blob = new Blob(
          [response],
          {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        );

        // Create download URL
        const url =
          window.URL.createObjectURL(blob);

        // Create temporary anchor
        const anchor =
          document.createElement('a');

        anchor.href = url;

        anchor.download =
          `SL_Manual_GP_Report_${fromDate}_to_${toDate}.xls`;

        // Append and download
        document.body.appendChild(anchor);

        anchor.click();

        // Cleanup
        document.body.removeChild(anchor);

        window.URL.revokeObjectURL(url);

        console.log('Report downloaded successfully.');
      },

      error: (error: any) => {

        this.isLoading = false;

        console.error(
          'Manual Gate Pass Report Download Error:',
          error
        );

        /*
         * Since responseType is blob,
         * backend error response can also come as Blob.
         */
        if (error?.error instanceof Blob) {

          const reader =
            new FileReader();

          reader.onload = () => {

            console.error(
              'Backend Error:',
              reader.result
            );
          };

          reader.readAsText(error.error);
        }

        // HTTP status based messages
        if (error?.status === 400) {

          this.errorMessage =
            'Invalid report parameters. Please check your selection.';

        } else if (error?.status === 404) {

          this.errorMessage =
            'Report service was not found. Please contact administrator.';

        } else if (error?.status === 500) {

          this.errorMessage =
            'Server error occurred while generating the report. Please try again.';

        } else if (error?.status === 0) {

          this.errorMessage =
            'Unable to connect to the server. Please check your network connection.';

        } else {

          this.errorMessage =
            'Unable to download the report. Please try again.';
        }
      }
    });
  }

  /**
   * Reset Form
   */
  resetForm(): void {

    this.reportForm.reset();

    this.errorMessage = '';

    /*
     * Reset session based location if required.
     * Keeping locId empty here so user can select again.
     */
    this.reportForm.patchValue({
      fromDate: '',
      toDate: '',
      locId: '',
      deptId: '',
      location: ''
    });
  }

  /**
   * Format Date
   *
   * Input:
   * yyyy-MM-dd
   *
   * Output:
   * dd-MMM-yyyy
   *
   * Example:
   * 2026-09-24
   * =>
   * 24-Sep-2026
   */
  private formatDate(date: string): string {

    if (!date) {
      return '';
    }

    /*
     * Split instead of new Date()
     * to avoid timezone issues.
     */
    const parts = date.split('-');

    if (parts.length !== 3) {
      return '';
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (
      !year ||
      !month ||
      !day
    ) {
      return '';
    }

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const monthName =
      monthNames[month - 1];

    if (!monthName) {
      return '';
    }

    return `${String(day).padStart(2, '0')}-${monthName}-${year}`;
  }

  /**
   * Location Dropdown Selection
   */
  onOptionsLocation(event: any): void {

    console.log('Selected Location:', event);

    /*
     * If dropdown directly returns locId
     */
    if (
      event !== null &&
      event !== undefined &&
      typeof event !== 'object'
    ) {

      this.reportForm.patchValue({
        locId: event
      });

      return;
    }

    /*
     * If dropdown returns an object
     */
    if (event && typeof event === 'object') {

      const locId =
        event.locId ??
        event.locationId ??
        event.id ??
        event.value ??
        '';

      const location =
        event.location ??
        event.outlet ??
        event.locName ??
        event.name ??
        '';

      this.reportForm.patchValue({
        locId: locId,
        location: location
      });

      console.log('Selected locId:', locId);
      console.log('Selected location:', location);
    }
  }

  /**
   * Optional helper:
   * Check whether a form control has error
   */
  isFieldInvalid(fieldName: string): boolean {

    const control =
      this.reportForm.get(fieldName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }

  close() {
    this.location.back();
  }

}
