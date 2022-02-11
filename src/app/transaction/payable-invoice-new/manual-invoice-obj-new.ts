export class ManualInvoiceObjNew {
    invoiceId: number;
    invoiceNum: string;
    suppId: number;
    supplierSiteId:number;
    ouId: number;
    setOfBooksId: number;
    currency: string;
    invoiceAmt: number;
    invTypeLookupCode: string;
    amtAppToDisc: number;
    accPayCodeCombId: number;
    paymentStatusFlag: string;
    poHeaderId: number;
    exclusivePayFlag: string;
  invLines: any[];
  invDisLines: any[];
  taxLines=new Array();
  
  getinvLines(){
    return this.invLines;
  }
  
  getinvDisLines(){
    return this.invDisLines;
  }
  
  setinvLines(val){
    this.invLines=val;
  }
  
  setinvDisLines(val1){
    this.invDisLines=val1;
  }
  getTaxLines(){
    return this.taxLines;
  }
  setTaxLines(val3){
    this.taxLines= val3
  }
}
