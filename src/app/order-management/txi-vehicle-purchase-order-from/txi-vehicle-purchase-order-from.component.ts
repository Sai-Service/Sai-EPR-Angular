import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../order-management.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-txi-vehicle-purchase-order-from',
  templateUrl: './txi-vehicle-purchase-order-from.component.html',
  styleUrls: ['./txi-vehicle-purchase-order-from.component.css']
})
export class TxiVehiclePurchaseOrderFromComponent implements OnInit, OnDestroy {

  poMasterDtoForm: FormGroup;
  pipe = new DatePipe('en-US');

  hsnSacCodeList: any[] = [];
  taxCategoryList: any[] = [];
  suppIdList: any[] = [];
  supplierCodeList: any[] = [];
  partList: any[] = [];
  BillShipList: any[] = [];
  BillShipList1: any[] = [];
  poTypeList: any[] = [];
  DepartmentList: any[] = [];

  ouId!: number;
  divisionId!: number;
  empId: any;
  dept: string = '';
  deptName: any;

  msgType: string = '';
  message1: string = '';

  showSaveBtn:    boolean = true;
  showApproveBtn: boolean = false;
  showPrintBtn:   boolean = false;
  isStatusOpen:   boolean = false;
  showGrrBtn:boolean=false;
  isLoading: boolean = false;
  loadingMessage: string = 'Processing, please wait...';
  displayPoLine: boolean[] = [];
  displayHSN: boolean[] = [];
  displayTaxCategotySelect: boolean[] = [];
  isLineButtonsDisabled = false;

  now = Date.now();
  todayApiDate: string = '';
  searchPoNoInput: string = '';

  private sub: any;

  @ViewChild('myinput') myInputField!: ElementRef;

  ngAfterViewInit() {
    this.myInputField?.nativeElement.focus();
  }


  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent): void {
    if (this.isLoading) {
      history.pushState(null, '', window.location.href);
    }
  }


  constructor(
    private fb: FormBuilder,
    private router1: ActivatedRoute,
    private router: Router,
    private service: OrderManagementService
  ) {
    this.poMasterDtoForm = this.fb.group({
      poHeaderId: [],
      ouId: [''],
      poDate: [{ value: '', disabled: true }],
      poType: [{ value: 'STANDERD PO', disabled: true }],
      segment1: [{ value: '', disabled: true }],
      accountLocId: [],
      supplierSiteId: [''],
      billToLoc: [],
      shipToLoc: [],
      currencyCode: [],
      status: [{ value: '', disabled: true }],
      totalAmt: [{ value: '', disabled: true }],
      supplierAddress: [],
      suppInvNo: [''],
      suppInvDate: [''],
      ewayBillNo: [],
      iRNNo: [],
      approveDate: [{ value: '', disabled: true }],
      TransactionNature: [],
      dept: [],
      baseAmount: [{ value: '', disabled: true }],
      empId: [],
      deptName: [{ value: '', disabled: true }],
      description: [''],
      totTaxAmt: [{ value: '', disabled: true }],
      ouName: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      divisionName: [{ value: '', disabled: true }],
      delearCode: [''],
      poInvMes: [],
      transId: [],
      dmsLocation: [],
      dmsInvoiceNo: [],
      dmsInvoiceDate: [],
      erpInvoiceNo: [],
      erpLocation: [],
      erpInvoiceDate: [],
      model: [{ value: '', disabled: true }],
      suppName: [''],
      variantCd: [{ value: '', disabled: true }],
      vin: [{ value: '', disabled: true }],
      chassisNum: [{ value: '', disabled: true }],
      ecolorCd: [{ value: '', disabled: true }],
      creationDate: [],
      createdBy: [],
      custName:  [{ value: '', disabled: true }],
      gstNo:     [{ value: '', disabled: true }],
      executive: [{ value: '', disabled: true }],
      teamHead:  [{ value: '', disabled: true }],
      fincName:  [{ value: '', disabled: true }],
      erpAccNo:  [{ value: '', disabled: true }],
      creditAmt:[],
      poLines: this.fb.array([this.lineDetailsGroup()])
    });
  }


  private _startLoading(msg: string = 'Processing, please wait...'): void {
    this.isLoading      = true;
    this.loadingMessage = msg;
    history.pushState(null, '', window.location.href);
  }



  private _stopLoading(): void {
    this.isLoading = false;
  }


  get lineDetailsArray(): FormArray {
    return this.poMasterDtoForm.get('poLines') as FormArray;
  }

  lineDetailsGroup(): FormGroup {
    return this.fb.group({
      poLineId: [],
      polineNum: [1],
      segment: [{ value: '', disabled: true }],
      invItemId: [],
      invDescription: [],
      invCategory: [],
      uom: [],
      discLineAmt: [0],
      hsnSacCode: [],
      gstPercentage: [],
      taxCategoryName: [],
      itemType: [],
      unitPrice: [{ value: '', disabled: true }],
      orderedQty: [''],
      baseAmtLineWise: [0],
      poChargeAcc: [],
      taxCategoryId: [],
      segmentName: [],
      taxAmtLineWise: [],
      totAmtLineWise: [],
      suppId:   [],
      suppName: [],
    });
  }

  ngOnInit(): void {
    this.empId      = Number(sessionStorage.getItem('emplId'));
    this.dept       = sessionStorage.getItem('dept') || '';
    this.deptName   = sessionStorage.getItem('deptName');
    this.ouId       = Number(sessionStorage.getItem('ouId'));
    this.divisionId = Number(sessionStorage.getItem('divisionId'));
    this.todayApiDate = (this.pipe.transform(this.now, 'yyyy-MM-dd') || '') as string;

    this.poMasterDtoForm.patchValue({
      divisionName: sessionStorage.getItem('divisionName'),
      poDate:       this.todayApiDate,
      deptName:     this.deptName,
      empId:        this.empId,
      ouName:       sessionStorage.getItem('ouName') || '',
      name:         sessionStorage.getItem('name') || '',
      poType:       'STANDARD PO',
    });

    this.service.poTypeList().subscribe(data => this.poTypeList = data);
    this.service.DepartmentList().subscribe(data => this.DepartmentList = data);
    this.service.supplierCodeListNew().subscribe(data => this.supplierCodeList = data);
    this.service.hsnSacCodeData('HSN').subscribe(data => this.hsnSacCodeList = data);

    this.service.getLocationSearch1(this.ouId).subscribe((data: any) => {
      this.BillShipList = data;
      const loc = data.find((v: any) => v.locId == sessionStorage.getItem('locId'));
      if (loc) this.poMasterDtoForm.patchValue({ shipToLoc: loc.locId });
    });

    this.service.getLocationSearch1(this.ouId).subscribe((data: any) => {
      this.BillShipList1 = data;
      const loc = data.find((v: any) => v.locId == sessionStorage.getItem('locId'));
      if (loc) this.poMasterDtoForm.patchValue({ billToLoc: loc.locId });
    });

    this.sub = this.router1.params.subscribe(params => {
      const transId = params['transId'];
      if (transId) {
        this.poMasterDtoForm.patchValue({ transId: transId });
        this.SobSearchId(transId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  

  SobSearchId(transId: any): void {
    if (!transId) return;

    this._startLoading('Searching SOB Number...');   // ← start loader

    this.service.getsearchBySOBNo(transId).subscribe({
      next: (data: any) => {
        this._stopLoading();                          // ← stop loader on success
        if (data.code !== 200) { alert(data.message); return; }
        const response = data.obj;

        if (response.header) {
          const header = response.header;
          const parts  = Array.isArray(response.lines) ? response.lines : [];

          this.partList = parts;

          const poLines = parts.map((p: any, idx: number) => {
            const qty    = 1;
            const price  = Number(p.price         || 0);
            const gstPct = Number(p.gstPercentage  || 0);
            const disc   = 0;
            const base   = this.round2(qty * price);
            const taxAmt = this.round2(base * gstPct / 100);
            const total  = this.round2(base - disc + taxAmt);
            const taxCategoryName = p.taxCategoryName || (gstPct > 0 ? 'GST @ ' + gstPct + '%' : null);
            return {
              poLineId: null, polineNum: idx + 1,
              segment: p.partName || '', invItemId: p.partId || null,
              invDescription: p.partDesc || '', invCategory: p.partNumber || '',
              uom: p.uom || null, hsnSacCode: p.hsnSacCode || null,
              gstPercentage: gstPct, taxCategoryName,
              itemType: 'GOODS', unitPrice: price, orderedQty: qty,
              baseAmtLineWise: base, taxAmtLineWise: taxAmt, totAmtLineWise: total,
              discLineAmt: disc, poChargeAcc: null, segmentName: null, taxCategoryId: null,
              suppId: p.suppId || null, suppName: p.suppName || null,
            };
          });

          const totalBase = this.round2(poLines.reduce((s: number, l: any) => s + l.baseAmtLineWise, 0));
          const totalTax  = this.round2(poLines.reduce((s: number, l: any) => s + l.taxAmtLineWise,  0));
          const totalAmt  = this.round2(poLines.reduce((s: number, l: any) => s + l.totAmtLineWise,  0));

          this._patchFormFromResponseSOB({ ...header, baseAmount: totalBase, totTaxAmt: totalTax, totalAmt, poLines });
        } else {
          this._patchFormFromResponse(response);
        }
      },
      error: (err) => {
        this._stopLoading();                          // ← stop loader on error
        console.error(err);
        alert('Search failed');
      }
    });
  }

  // ─── Search by PO Number ──────────────────────────────────────────────────

  searchByPoNumber(segment1: string): void {
    if (!segment1 || !segment1.trim()) { alert('Please enter a PO Number to search.'); return; }

    this._startLoading('Searching PO Number...');    // ← start loader

    this.service.getBySegment(segment1.trim()).subscribe({
      next: (data: any) => {
        this._stopLoading();                          // ← stop loader on success
        if (data.code !== 200) { alert(data.message || 'PO not found'); return; }
        this._patchFormFromResponse(this._normalizeSegmentResponse(data.obj));
      },
      error: (err) => {
        this._stopLoading();                          // ← stop loader on error
        console.error(err);
        alert('PO Number search failed');
      }
    });
  }

  private _normalizeSegmentResponse(obj: any): any {
    const h        = obj.header || obj;
    const rawLines = obj.lines  || obj.poLines || [];
    const poLines  = rawLines.map((l: any) => ({
      poLineId: l.poLineId || null, polineNum: l.poLineNum || l.polineNum || null,
      segment: l.partNumber || l.segment || '', invItemId: l.invItemId || null,
      invDescription: l.invDescription || null, invCategory: l.invCategory || null,
      uom: l.uom || null, hsnSacCode: l.hsnSacCode || null,
      gstPercentage: l.gstPercentage || 0, taxCategoryName: l.taxCategoryName || null,
      taxCategoryId: l.taxCategoryId || null, itemType: l.itemType || 'GOODS',
      unitPrice: l.unitPrice || 0, orderedQty: l.orderedQty || 0,
      baseAmtLineWise: l.baseAmtLineWise || 0, discLineAmt: l.disAmt || l.discLineAmt || 0,
      taxAmtLineWise: l.taxAmtLineWise || 0, totAmtLineWise: l.totAmtLineWise || 0,
      poChargeAcc: l.poChargeAcc || null, segmentName: l.segmentName || null,
      suppId: l.suppId || null, suppName: l.suppName || null,
    }));
    return { ...h, poLines };
  }

  // ─── SOB search response patch ────────────────────────────────────────────

  private _patchFormFromResponseSOB(obj: any): void {
    this.poMasterDtoForm.patchValue({
      transId:             obj.transId,
      dmsLocation:         obj.dmsLocation,
      dmsInvoiceNo:        obj.dmsInvoiceNo,
      dmsInvoiceDate:      this.pipe.transform(obj.dmsInvoiceDate, 'dd-MM-yyyy'),
      erpInvoiceNo:        obj.erpInvoiceNo,
      erpLocation:         obj.erpLocation,
      erpInvoiceDate:      this.pipe.transform(obj.erpInvoiceDate, 'dd-MM-yyyy'),
      model:               obj.model,
      variantCd:           obj.variantCd,
      vin:                 obj.vin,
      chassisNum:          obj.chassisNum,
      ecolorCd:            obj.ecolorCd,
      createdBy:           obj.createdBy,
      segment1:            obj.segment1,
       poType:       'STANDARD PO',
      supplierAddress:     obj.supplierAddress,
      status: obj.status || obj.status || null,
      baseAmount:          obj.baseAmount,
      totTaxAmt:           obj.totTaxAmt,
      totalAmt:            obj.totalAmt,
      suppInvNo:           obj.suppInvNo,
      suppInvDate:         this.pipe.transform(obj.suppInvDate, 'dd-MM-yyyy'),
      approveDate:         this.pipe.transform(obj.approveDate, 'dd-MM-yyyy'),
      description:         obj.description,
      ewayBillNo:          obj.ewayBillNo,
      iRNNo:               obj.iRNNo,
      dept:                obj.dept,
      empId:               obj.empId,
      poHeaderId:          obj.poHeaderId,
      custName:            obj.custName  || null,
      gstNo:               obj.gstNo    || null,
      executive:           obj.executive || null,
      teamHead:            obj.teamHead  || null,
      fincName:            obj.fincName  || null,
      erpAccNo:            obj.erpAccNo  || null,
    });

    if (obj.status === 'OPEN') {
      alert('PO Already Generated !!!');
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showGrrBtn=false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this.isLineButtonsDisabled = true;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('suppInvNo')?.enable();
      this.poMasterDtoForm.get('suppInvDate')?.enable();
      this.poMasterDtoForm.get('description')?.enable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else if (obj.status === 'APPROVED') {
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else if (obj.status === 'SEND') {
      alert('PO Already Sent To Vendor ...... !!!!');
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this.showGrrBtn=false;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else {
      this.isStatusOpen = false; this.showSaveBtn = true;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this._enableFormForEdit();
    }

    if (obj.poLines && obj.poLines.length > 0) this._buildPoLinesFromResponse(obj.poLines);
    if (obj.variantCd) this.loadPartsByVariant(obj.variantCd);

    alert('Data loaded successfully');
  }

  // ─── PO-number search response patch ─────────────────────────────────────

  private _patchFormFromResponse(obj: any): void {
    this.poMasterDtoForm.patchValue({
      poType:       'STANDARD PO',
      transId:             obj.transId,
      dmsLocation:         obj.dmsLocation,
      dmsInvoiceNo:        obj.dmsInvoiceNo,
      dmsInvoiceDate:      this.pipe.transform(obj.dmsInvoiceDate, 'dd-MM-yyyy'),
      erpInvoiceNo:        obj.erpInvoiceNo,
      erpLocation:         obj.erpLocation,
      erpInvoiceDate:      this.pipe.transform(obj.erpInvoiceDate, 'dd-MM-yyyy'),
      model:               obj.model,
      variantCd:           obj.variantCd,
      vin:                 obj.vin,
      chassisNum:          obj.chassisNum,
      ecolorCd:            obj.ecolorCd,
      createdBy:           obj.createdBy,
      segment1:            obj.segment1,
      supplierAddress:     obj.supplierAddress,
      status: obj.status || obj.status || null,
      baseAmount:          obj.baseAmount,
      totTaxAmt:           obj.totTaxAmt,
      totalAmt:            obj.totalAmt,
      suppInvNo:           obj.suppInvNo,
      suppInvDate:         this.pipe.transform(obj.suppInvDate, 'dd-MM-yyyy'),
      approveDate:         this.pipe.transform(obj.approveDate, 'dd-MM-yyyy'),
      description:         obj.description,
      ewayBillNo:          obj.ewayBillNo,
      iRNNo:               obj.iRNNo,
      dept:                obj.dept,
      empId:               obj.empId,
      poHeaderId:          obj.poHeaderId,
      custName:            obj.custName  || null,
      gstNo:               obj.gstNo    || null,
      executive:           obj.executive || null,
      teamHead:            obj.teamHead  || null,
      fincName:            obj.fincName  || null,
      erpAccNo:            obj.erpAccNo  || null,
    });

    if (obj.status === 'OPEN') {
      alert('PO Already Generated....Aproved And send to vendor');
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = true;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('suppInvNo')?.enable();
      this.poMasterDtoForm.get('suppInvDate')?.enable();
      this.poMasterDtoForm.get('description')?.enable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else if (obj.status === 'APPROVED') {
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else if (obj.status === 'SEND') {
      alert('PO Already Sent To Vendor ...... !!!!');
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this.showGrrBtn=false;
      this.poMasterDtoForm.disable();
      this.poMasterDtoForm.get('transId')?.enable();

    } else {
      this.isStatusOpen = false; this.showSaveBtn = false;
      this.showApproveBtn = false; this.showPrintBtn = false;
      this._enableFormForEdit();
    }

    if (obj.poLines && obj.poLines.length > 0) this._buildPoLinesFromResponse(obj.poLines);
    if (obj.variantCd) this.loadPartsByVariant(obj.variantCd);

    alert('Data loaded successfully');
  }

  private _enableFormForEdit(): void {
    this.poMasterDtoForm.enable();
    const readOnly = ['poDate','segment1','ouName','name','deptName','divisionName',
                      'status','approveDate','baseAmount','totTaxAmt','totalAmt',
                      'custName','gstNo','executive','teamHead','fincName','erpAccNo','poType','deptName','model'];
    readOnly.forEach(f => this.poMasterDtoForm.get(f)?.disable());
  }
  private _buildPoLinesFromResponse(poLines: any[]): void {
    const control = this.poMasterDtoForm.get('poLines') as FormArray;
    while (control.length) control.removeAt(0);
    poLines.forEach((line: any, i: number) => {
      control.push(this.lineDetailsGroup());
      this.displayPoLine[i] = false;
      this.displayHSN[i]    = (line.itemType === 'GOODS');
      (control.controls[i] as FormGroup).patchValue({
        poLineId: line.poLineId, polineNum: line.polineNum != null ? line.polineNum : i + 1,
        segment: line.segment || '', invItemId: line.invItemId || null,
        invDescription: line.invDescription || null, invCategory: line.invCategory || null,
        uom: line.uom || null, hsnSacCode: line.hsnSacCode || null,
        gstPercentage: line.gstPercentage || 0, taxCategoryName: line.taxCategoryName || null,
        taxCategoryId: line.taxCategoryId || null, itemType: line.itemType || 'GOODS',
        unitPrice: line.unitPrice || 0, orderedQty: line.orderedQty || 0,
        baseAmtLineWise: line.baseAmtLineWise || 0, discLineAmt: line.discLineAmt || 0,
        taxAmtLineWise: line.taxAmtLineWise || 0, totAmtLineWise: line.totAmtLineWise || 0,
        poChargeAcc: line.poChargeAcc || null, segmentName: line.segmentName || null,
        suppId: line.suppId || null, suppName: line.suppName || null,
      });
    });

    if (this.isStatusOpen) {
      control.enable({ emitEvent: false });
    }
    if (this.poMasterDtoForm.disabled) {
      control.disable({ emitEvent: false });
    }
    this.updateTotAmtPerline();
  }

  loadPartsByVariant(variantCd: string): void {
    if (!variantCd) { this.partList = []; return; }
    this.service.getPartsByVariant(variantCd).subscribe({
      next: (res: any) => { this.partList = (res.code === 200 && Array.isArray(res.obj)) ? res.obj : []; },
      error: () => { this.partList = []; }
    });
  }

  onSupplierCodeSelected(supp: string): void {
    if (!supp || !supp.includes('@')) return;
    const suppNo        = supp.substr(supp.indexOf('@') + 1);
    const selectedValue = this.supplierCodeList.find((v: any) => v.suppNo == suppNo);
    if (!selectedValue) return;
    this.poMasterDtoForm.get('suppId')?.setValue(selectedValue.suppId);
  }

  private _autoSelectSite(targetSiteId: number | null): void {
    if (targetSiteId && Number(targetSiteId) !== 0) {
      this.poMasterDtoForm.get('supplierSiteId')?.setValue(targetSiteId);
    } else if (this.suppIdList.length === 1) {
      this.poMasterDtoForm.get('supplierSiteId')?.setValue(this.suppIdList[0].suppSiteId);
    }
  }

  onLineItemSelected(event: any, index: number): void {
    const selectedValue: string = event.target.value;
    if (!selectedValue) return;
    const part = this.partList.find((p: any) => p.partName === selectedValue);
    if (!part) return;
    const lineGrp = (this.poMasterDtoForm.get('poLines') as FormArray).controls[index] as FormGroup;
    lineGrp.patchValue({
      segment: part.partName || '', invItemId: part.partId || null,
      invDescription: part.partDesc || '', invCategory: part.partNumber || '',
      uom: part.uom || '', hsnSacCode: part.hsnSacCode || '',
      gstPercentage: part.gstPercentage || 0,
      suppId: part.suppId || null, suppName: part.suppName || null,
    });
    this.calculateLineAmt(index);
    this.displayHSN[index] = (part.itemType === 'GOODS');
  }

  addRow(index: number): void {
    const arrayControlNew = this.poMasterDtoForm.get('poLines') as FormArray;
    if (arrayControlNew.getRawValue()[index].invItemId == null) {
      alert('Kindly insert the line details first'); return;
    }
    this.lineDetailsArray.push(this.lineDetailsGroup());
    const newIndex = index + 1;
    (arrayControlNew.controls[newIndex] as FormGroup).patchValue({ polineNum: newIndex + 1 });
    this.displayPoLine.push(true);
    this.displayTaxCategotySelect[index] = false;
  }

  RemoveRow(index: number): void {
    if (this.lineDetailsArray.length === 1) { alert('At least one line is required'); return; }
    this.lineDetailsArray.removeAt(index);
    this.displayPoLine.splice(index, 1);
    const formArr = this.poMasterDtoForm.get('poLines') as FormArray;
    for (let i = 0; i < formArr.length; i++) {
      (formArr.controls[i] as FormGroup).patchValue({ polineNum: i + 1 });
    }
    this.updateTotAmtPerline();
  }

  calculateLineAmt(index: number): void {
    const formArr = this.poMasterDtoForm.get('poLines') as FormArray;
    const lineGrp = formArr.controls[index] as FormGroup;
    const lineVal = lineGrp.getRawValue();
    const qty    = Number(lineVal.orderedQty   || 0);
    const price  = Number(lineVal.unitPrice     || 0);
    const disc   = Number(lineVal.discLineAmt   || 0);
    const gstPct = Number(lineVal.gstPercentage || 0);
    const base   = this.round2(qty * price);
    const taxAmt = this.round2(base * gstPct / 100);
    const total  = this.round2(base - disc + taxAmt);
    const currentCat  = lineVal.taxCategoryName;
    const expectedCat = gstPct > 0 ? 'GST @ ' + gstPct + '%' : '';
    lineGrp.patchValue({
      baseAmtLineWise: base, taxAmtLineWise: taxAmt, totAmtLineWise: total,
      taxCategoryName: (!currentCat && expectedCat) ? expectedCat : currentCat,
    }, { emitEvent: false });
    this.updateTotAmtPerline();
  }

  private round2(val: number): number {
    return Math.round((val + Number.EPSILON) * 100) / 100;
  }

  private toApiDate(val: any): string {
    if (!val) return this.todayApiDate;
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    if (typeof val === 'string' && val.includes('-')) {
      const parts = val.split('-');
      if (parts.length === 3 && parts[2].length === 4) {
        const [d, m, y] = parts;
        return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      }
    }
    const dt = new Date(val);
    if (!isNaN(dt.getTime())) return (this.pipe.transform(dt, 'yyyy-MM-dd') || this.todayApiDate) as string;
    return this.todayApiDate;
  }

  updateTotAmtPerline(): void {
    const formVal = (this.poMasterDtoForm.get('poLines') as FormArray).getRawValue();
    let basicAmt = 0, taxAmt = 0, totAmt = 0;
    for (const v of formVal) {
      basicAmt += Number(v.baseAmtLineWise || 0);
      taxAmt   += Number(v.taxAmtLineWise  || 0);
      totAmt   += Number(v.totAmtLineWise  || 0);
    }
    this.poMasterDtoForm.patchValue({
      baseAmount: this.round2(basicAmt),
      totTaxAmt:  this.round2(taxAmt),
      totalAmt:   this.round2(totAmt),
    });
  }

  onHsnCodeSelected(hsnCode: string, index: number): void {
    if (!hsnCode) return;
    const hsn = this.hsnSacCodeList.find((v: any) => v.hsnsaccode === hsnCode);
    if (!hsn) return;
    const gstPct = Number(hsn.gstPercentage || 0);
    ((this.poMasterDtoForm.get('poLines') as FormArray).controls[index] as FormGroup).patchValue({
      gstPercentage: gstPct, taxCategoryName: 'GST @ ' + gstPct + '%',
    }, { emitEvent: false });
    this.calculateLineAmt(index);
  }

  executeAction(): void {
    if (this.msgType === 'Save')       this.savePO();
     if (this.msgType === 'GRR')       this.grrTaxiVeh();
    if (this.msgType === 'Approve')    this.approvePO();
    if (this.msgType === 'ViewPrint')  this.viewPoPrint();
    if (this.msgType === 'SendVendor') this.sendPoToVendor();
    if (this.msgType === 'Reset')      this.clearFormArray();
    if (this.msgType === 'Close')      this.closeMast();
  }

  clearFormArray(): void { window.location.reload(); }
  closeMast(): void { this.router.navigate(['admin']); }

  
  viewPoPrint(): void {
    const segment1 = this.poMasterDtoForm.getRawValue().segment1;
    if (!segment1) { alert('No approved PO loaded.'); return; }

    this._startLoading('Opening PO Print...');      
    this.service.getPoPrintUrl(segment1).subscribe({
      next: (res: any) => {
        this._stopLoading();                         
        window.open(
          (res.code === 200 && res.obj) ? res.obj : this.service.ServerUrl + '/taxipo/poprint/' + segment1,
          '_blank'
        );
      },
      error: () => {
        this._stopLoading();                          
        window.open(this.service.ServerUrl + '/taxipo/poprint/' + this.poMasterDtoForm.getRawValue().segment1, '_blank');
      }
    });
  }



  sendPoToVendor(): void {
    const segment1 = this.poMasterDtoForm.getRawValue().segment1;
    if (!segment1) { alert('No approved PO loaded.'); return; }

    this._startLoading('Sending PO to Vendor...');   // ← start loader

    this.service.sendPoToVendor(segment1).subscribe({
      next: (res: any) => {
        this._stopLoading();                          // ← stop loader
        alert(res.code === 200 ? (res.message || 'PO sent to vendor successfully.') : 'Error: ' + (res.message || 'Send failed'));
      },
      error: (err: any) => {
         alert('PO sent to vendor successfully.')
        this._stopLoading(); 
        this.searchByPoNumber(segment1);
         }
    });
  }


approvePO(): void {
    const raw      = this.poMasterDtoForm.getRawValue();
    const segment1 = raw.segment1;
    const transId  = raw.transId;
    if (!segment1) { alert('PO Number (segment1) is missing. Please load a PO first.'); return; }
    const allLines: any[] = (raw.poLines || []).filter((l: any) => l.segment || l.invItemId);
    const payload = {
      header: {
        transId: transId || null, dmsLocation: raw.dmsLocation || null,
        dmsInvoiceNo: raw.dmsInvoiceNo || null, dmsInvoiceDate: raw.dmsInvoiceDate || null,
        erpInvoiceNo: raw.erpInvoiceNo || null, erpLocation: raw.erpLocation || null,
        erpInvoiceDate: raw.erpInvoiceDate || null, model: raw.model || null,
        variantCd: raw.variantCd || null, vin: raw.vin || null,
        chassisNum: raw.chassisNum || null, ecolorCd: raw.ecolorCd || null,
        executive: raw.executive || null, teamHead: raw.teamHead || null,
        fincName: raw.fincName || null, erpAccNo: raw.erpAccNo || null,
        gstNo: raw.gstNo || null, custName: raw.custName || null,
        status: 'APPROVED', approveDate: this.todayApiDate,
        approvedBy: Number(this.empId || 1),
        baseAmount: Number(raw.baseAmount || 0), totalAmt: Number(raw.totalAmt || 0),
        totTaxAmt: Number(raw.totTaxAmt || 0), totDiscAmt: 0,
        dept: Number(raw.dept || this.dept), divisionId: this.divisionId,
        empId: Number(raw.empId || this.empId), poDate: raw.poDate || this.todayApiDate,
        poType: raw.poType || null, segment1,
        description: raw.description || null, suppInvNo: raw.suppInvNo || null,
        suppInvDate: raw.suppInvDate || null,
        billToLoc: Number(raw.billToLoc || 0), shipToLoc: Number(raw.shipToLoc || 0),
        ouId: this.ouId, supplierSiteId: Number(raw.supplierSiteId || 0),
        suppName: raw.suppName || null, billSubYn: 'Y',
        createdBy: Number(this.empId || 1), poHeaderId: raw.poHeaderId,
      },
      lines: allLines.map((l: any, idx: number) => ({
        poLineNum: l.polineNum || idx + 1, partNumber: l.segment || null,
        itemType: l.itemType || 'GOODS', orderedQty: Number(l.orderedQty || 0),
        unitPrice: Number(l.unitPrice || 0), baseAmtLineWise: Number(l.baseAmtLineWise || 0),
        taxAmtLineWise: Number(l.taxAmtLineWise || 0), totAmtLineWise: Number(l.totAmtLineWise || 0),
        disAmt: Number(l.discLineAmt || 0), hsnSacCode: l.hsnSacCode || null,
        gstPercentage: Number(l.gstPercentage || 0), taxCategoryName: l.taxCategoryName || null,
        invDescription: l.invDescription || null, invCategory: l.invCategory || null,
        uom: l.uom || null, segmentName: l.segmentName || null,
        lineStatus: 'APPROVED', ouId: this.ouId, createdBy: Number(this.empId || 1),
        suppId: l.suppId || null, suppName: l.suppName || null,
      }))
    };

    this._startLoading('Approving PO...');            // ← start loader

    this.service.updateTaxiPO(segment1, payload).subscribe({
      next: (res: any) => {
        this._stopLoading();                          // ← stop loader
        if (res.code === 200) {
          alert(res.message || 'PO Approved successfully');
          this.searchByPoNumber(segment1);
        } else { alert('Error: ' + (res.message || 'Approval failed')); }
      },
      error: (err: any) => {
        this._stopLoading();                          // ← stop loader on error
        alert('Approval failed: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  // ─── Save PO ──────────────────────────────────────────────────────────────

  savePO(): void {
    const raw = this.poMasterDtoForm.getRawValue();
    const headerErrors: string[] = [];

    if (!raw.transId || !String(raw.transId).trim())
      headerErrors.push('SOB Number  : is required. Please search a valid SOB Number first.');
    if (!raw.poType)
      headerErrors.push('PO Type     : is required. Please select a PO Type.');
    if (!raw.billToLoc || Number(raw.billToLoc) === 0)
      headerErrors.push('Bill-To     : is required. Please select a Bill-To location.');
    if (!raw.shipToLoc || Number(raw.shipToLoc) === 0)
      headerErrors.push('Ship-To     : is required. Please select a Ship-To location.');

    if (headerErrors.length > 0) {
      alert('── Header Validation Errors ──\n\n' + headerErrors.map((e, i) => (i + 1) + '.  ' + e).join('\n'));
      return;
    }

    const creditAmt = Number(raw.creditAmt);
const totalAmt = Number(raw.totalAmt || 0);

if (creditAmt !== totalAmt) {
  alert(
    `Credit Amount (${creditAmt}) and Total Amount (${totalAmt}) must be equal. Please enter the same amount.`
  );
  return;
}

    const validLines: any[] = (raw.poLines || []).filter((l: any) => l.segment && Number(l.unitPrice) > 0);
    if (validLines.length === 0) {
      alert('Line Validation Error: Please add at least one line item with an Inventory Item and Unit Price.'); return;
    }

    const lineErrors: string[] = [];
    validLines.forEach((l: any, idx: number) => {
      const lineNo = idx + 1; const name = l.segment || ('Line ' + lineNo);
      if (!l.orderedQty || Number(l.orderedQty) <= 0)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – Quantity must be greater than 0.');
      if (!l.unitPrice || Number(l.unitPrice) <= 0)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – Unit Price must be greater than 0.');
      if (!l.hsnSacCode)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – HSN/SAC Code is required.');
    });



    if (lineErrors.length > 0) {
      alert('── Line Validation Errors ──\n\n' + lineErrors.map((e, i) => (i + 1) + '.  ' + e).join('\n')); return;
    }

    const payload = {
      header: {
        transId: raw.transId || null, dmsLocation: raw.dmsLocation || null,
        dmsInvoiceNo: raw.dmsInvoiceNo || null, dmsInvoiceDate: raw.dmsInvoiceDate || null,
        erpInvoiceNo: raw.erpInvoiceNo || null, erpLocation: raw.erpLocation || null,
        erpInvoiceDate: raw.erpInvoiceDate || null, model: raw.model || null,
        executive: raw.executive || null, teamHead: raw.teamHead || null,
        fincName: raw.fincName || null, erpAccNo: raw.erpAccNo || null,creditAmt :raw.creditAmt || null,
        gstNo: raw.gstNo || null, custName: raw.custName || null,
        variantCd: raw.variantCd || null, vin: raw.vin || null,
        chassisNum: raw.chassisNum || null, ecolorCd: raw.ecolorCd || null,
        status: 'OPEN', baseAmount: Number(raw.baseAmount || 0),
        totalAmt: Number(raw.totalAmt || 0), totTaxAmt: Number(raw.totTaxAmt || 0),
        totDiscAmt: 0, dept: Number(raw.dept || this.dept), divisionId: this.divisionId,
        empId: Number(raw.empId || this.empId), poDate: raw.poDate || this.todayApiDate,
        poType: raw.poType || null, segment1: raw.segment1 || null,
        description: raw.description || null,
        billToLoc: Number(raw.billToLoc || 0), shipToLoc: Number(raw.shipToLoc || 0),
        ouId: this.ouId, suppId: raw.suppId || null,
        supplierSiteId: Number(raw.supplierSiteId || 0), suppName: raw.suppName || null,
        suppInvNo: raw.suppInvNo || null, suppInvDate: raw.suppInvDate || null,
        billSubYn: 'Y', createdBy: Number(this.empId || 1),
      },
      lines: validLines.map((l: any, idx: number) => ({
        poLineNum: l.polineNum || idx + 1, partNumber: l.segment || null,
        itemType: l.itemType || 'GOODS', orderedQty: Number(l.orderedQty || 0),
        unitPrice: Number(l.unitPrice || 0), baseAmtLineWise: Number(l.baseAmtLineWise || 0),
        taxAmtLineWise: Number(l.taxAmtLineWise || 0), totAmtLineWise: Number(l.totAmtLineWise || 0),
        disAmt: Number(l.discLineAmt || 0), hsnSacCode: l.hsnSacCode || null,
        gstPercentage: Number(l.gstPercentage || 0), taxCategoryName: l.taxCategoryName || null,
        invDescription: l.invDescription || null, invCategory: l.invCategory || null,
        uom: l.uom || null, segmentName: l.segmentName || null,
        lineStatus: 'ORDER', ouId: this.ouId, createdBy: Number(this.empId || 1),
        suppId: l.suppId || null, suppName: l.suppName || null,
      }))
    };

    this._startLoading('Saving PO...');               

    this.service.saveTaxiPO(payload).subscribe({
      next: (res: any) => {
        this._stopLoading();                          
        if (res.code === 200) {
          const s = res.obj;
          this.poMasterDtoForm.patchValue({
            poHeaderId: s.poHeaderId, transId: s.transId, segment1: s.segment1,
            suppId: s.suppId, baseAmount: s.baseAmount, totTaxAmt: s.totTaxAmt,
            totalAmt: s.totalAmt, billToLoc: s.billToLoc, shipToLoc: s.shipToLoc,
          });
          if (s.status === 'OPEN') {
            this.showSaveBtn = false; this.showApproveBtn = false;
            this.showPrintBtn=true;
            this.poMasterDtoForm.disable();
            ['suppInvNo', 'suppInvDate', 'description'].forEach(f => this.poMasterDtoForm.get(f)?.enable());
          } else { this._enableFormForEdit(); }
          alert(res.message || 'PO saved successfully');
        } else { alert('Error: ' + (res.message || 'Save failed')); }
      },
      error: (err: any) => {
        this._stopLoading();                          // ← stop loader on error
        alert('Save failed: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }



  grrTaxiVeh(): void {
    const raw = this.poMasterDtoForm.getRawValue();
    const headerErrors: string[] = [];

    if (!raw.transId || !String(raw.transId).trim())
      headerErrors.push('SOB Number  : is required. Please search a valid SOB Number first.');
    if (!raw.poType)
      headerErrors.push('PO Type     : is required. Please select a PO Type.');
    if (!raw.billToLoc || Number(raw.billToLoc) === 0)
      headerErrors.push('Bill-To     : is required. Please select a Bill-To location.');
    if (!raw.shipToLoc || Number(raw.shipToLoc) === 0)
      headerErrors.push('Ship-To     : is required. Please select a Ship-To location.');

    if (headerErrors.length > 0) {
      alert('── Header Validation Errors ──\n\n' + headerErrors.map((e, i) => (i + 1) + '.  ' + e).join('\n'));
      return;
    }


    const validLines: any[] = (raw.poLines || []).filter((l: any) => l.segment && Number(l.unitPrice) > 0);
    if (validLines.length === 0) {
      alert('Line Validation Error: Please add at least one line item with an Inventory Item and Unit Price.'); return;
    }

    const lineErrors: string[] = [];
    validLines.forEach((l: any, idx: number) => {
      const lineNo = idx + 1; const name = l.segment || ('Line ' + lineNo);
      if (!l.orderedQty || Number(l.orderedQty) <= 0)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – Quantity must be greater than 0.');
      if (!l.unitPrice || Number(l.unitPrice) <= 0)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – Unit Price must be greater than 0.');
      if (!l.hsnSacCode)
        lineErrors.push('Line ' + lineNo + ' [' + name + '] – HSN/SAC Code is required.');
    });



    if (lineErrors.length > 0) {
      alert('── Line Validation Errors ──\n\n' + lineErrors.map((e, i) => (i + 1) + '.  ' + e).join('\n')); return;
    }

    const payload = {
      header: {
        transId: raw.transId || null, dmsLocation: raw.dmsLocation || null,
        dmsInvoiceNo: raw.dmsInvoiceNo || null, dmsInvoiceDate: raw.dmsInvoiceDate || null,
        erpInvoiceNo: raw.erpInvoiceNo || null, erpLocation: raw.erpLocation || null,
        erpInvoiceDate: raw.erpInvoiceDate || null, model: raw.model || null,
        executive: raw.executive || null, teamHead: raw.teamHead || null,
        fincName: raw.fincName || null, erpAccNo: raw.erpAccNo || null,creditAmt :raw.creditAmt || null,
        gstNo: raw.gstNo || null, custName: raw.custName || null,
        variantCd: raw.variantCd || null, vin: raw.vin || null,
        poHeaderId:raw.poHeaderId,
        chassisNum: raw.chassisNum || null, ecolorCd: raw.ecolorCd || null,
        status: 'GRR', baseAmount: Number(raw.baseAmount || 0),
        totalAmt: Number(raw.totalAmt || 0), totTaxAmt: Number(raw.totTaxAmt || 0),
        totDiscAmt: 0, dept: Number(raw.dept || this.dept), divisionId: this.divisionId,
        empId: Number(raw.empId || this.empId), poDate: raw.poDate || this.todayApiDate,
        poType: raw.poType || null, segment1: raw.segment1 || null,
        description: raw.description || null,
        billToLoc: Number(raw.billToLoc || 0), shipToLoc: Number(raw.shipToLoc || 0),
        ouId: this.ouId, suppId: raw.suppId || null,
        supplierSiteId: Number(raw.supplierSiteId || 0), suppName: raw.suppName || null,
        suppInvNo: raw.suppInvNo || null, suppInvDate: raw.suppInvDate || null,
        billSubYn: 'Y', createdBy: Number(this.empId || 1),
      },
      lines: validLines.map((l: any, idx: number) => ({
        poLineNum: l.polineNum || idx + 1, partNumber: l.segment || null,
        itemType: l.itemType || 'GOODS', orderedQty: Number(l.orderedQty || 0),
        unitPrice: Number(l.unitPrice || 0), baseAmtLineWise: Number(l.baseAmtLineWise || 0),
        taxAmtLineWise: Number(l.taxAmtLineWise || 0), totAmtLineWise: Number(l.totAmtLineWise || 0),
        disAmt: Number(l.discLineAmt || 0), hsnSacCode: l.hsnSacCode || null,
        gstPercentage: Number(l.gstPercentage || 0), taxCategoryName: l.taxCategoryName || null,
        invDescription: l.invDescription || null, invCategory: l.invCategory || null,
        uom: l.uom || null, segmentName: l.segmentName || null,
        lineStatus: 'GRR', ouId: this.ouId, createdBy: Number(this.empId || 1),
        suppId: l.suppId || null, suppName: l.suppame || null,
      }))
    };

    this._startLoading('GOOD RECIEVED RECIEPT ....');               

    this.service.grrTaxiPO(payload).subscribe({
      next: (res: any) => {
        this._stopLoading();                          
        if (res.code === 200) {
          const s = res.obj;
          this.poMasterDtoForm.patchValue({
            poHeaderId: s.poHeaderId, transId: s.transId, segment1: s.segment1,
            suppId: s.suppId, baseAmount: s.baseAmount, totTaxAmt: s.totTaxAmt,
            totalAmt: s.totalAmt, billToLoc: s.billToLoc, shipToLoc: s.shipToLoc,
          });
          if (s.status === 'GRR') {
            this.showSaveBtn = false; this.showApproveBtn = false;
            this.showPrintBtn=false;
            this.poMasterDtoForm.disable();
            ['suppInvNo', 'suppInvDate', 'description'].forEach(f => this.poMasterDtoForm.get(f)?.enable());
          } else { this._enableFormForEdit(); }
          alert(res.message || 'GRR Generated successfully');
        } else { alert('Error: ' + (res.message || 'Save failed')); }
      },
      error: (err: any) => {
        this._stopLoading();                          
        alert('Save failed: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }
}