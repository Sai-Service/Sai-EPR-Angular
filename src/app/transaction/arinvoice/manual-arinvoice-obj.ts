export class ManualARInvoiceObj {
  source: string;
  locId: string;
  trxNumber1: number;
  trxNumber: number;
  custTrxTypeId: number;
  referenceNo: string;
  dmsInvNo: string;
  dmsOrderNo: string;
  paymentTerm: string;
  invCurrancyCode: string;
  freight: number;
  charges: number;
  taxAmount: number;
  invoiceDate: string;
  shipToSiteId: number;
  billToCustId: number;
  billToSiteId: number;
  shipToCustId: number;
  glDate: string;
  invoiceAmount: number;
  shipToCustName: string;
  shipToCustNo: number;
  shipToCustAdd: string;
  billToCustName: string;
  billToCustNo: number;
  billToCustAdd: string;
  soldToCustName: string;
  soldToCustId: number;
  segment11: string;
  segment2: string;
  segment4: string;
  segment5: string;
  lookupValueDesc4: string;
  lookupValueDesc1: string;
  lookupValueDesc2: string;
  lookupValueDesc3: string;
  lookupValueDesc5: string;
  ouId: number;
  status: string;
  invLines: any[];
  invDisLines=new Array();
  taxLines=new Array();


  getinvLines() {
    return this.invLines;
  }

  getinvDisLines() {
    return this.invDisLines;
  }

  setinvLines(val) {
    this.invLines = val;
  }

  setinvDisLines(val1) {
    this.invDisLines = val1;
  }
  getTaxLines() {
    return this.taxLines;
  }
  setTaxLines(val3) {
    this.taxLines = val3
  }


}
