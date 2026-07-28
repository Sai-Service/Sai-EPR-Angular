export class SalesOrderobj {
    divisionName: string;
    ouName: string;
    refCustNo:string;
    exchange:string;
    taxiYN:string;
    loyaltyBonus:string;
    exRegNo:string;
    insCharges:string;
    csdIndexNo:number;
    csdPoNo:string;
    csdDate:Date;
    offerPrice:number;
    paymentTermId:number;
    locCode: string;
    locId:number;
    locationId:number;
    ticketNo: string;
    orderNumber: number;
    accountNo: number
    custName: string;
    orderedDate: Date;
    transactionTypeName: string;
    flowStatusCode: string;
    payTermDesc:string;
    salesRepName: string;
    tlName: string;
    remarks: string;
    subtotal: string;
    issueCodeType:string;
    fuelType:string;
    totTax: string;
    totAmt: string;
    custAddress: string;
    model:string;
    variant: string;
    color: string;
    financeType: string;
    financerName: string;
    financeAmt: number;
    emi: number;
    tenure: number;
    downPayment: number;
    // emplId: number;
    priceListName: string;
    billLocName: string;
    shipLocName: string;
    customerId: number;
    billToAddress: string;
    custAccountNo:number;
    gstNo: string;
    panNo:string;
    tcs:string;
    public ouId = Number(sessionStorage.getItem('ouId'));
    public emplId = Number(sessionStorage.getItem('emplId'));
   public divisionId = Number(sessionStorage.getItem('divisionId'));
    oeOrderLinesAllList:any[];
    taxAmounts:any[];

    getoeOrderLinesAllList() {
        return this.oeOrderLinesAllList;
      }
    
      gettaxAmounts() {
        return this.taxAmounts;
      }
    
      setoeOrderLinesAllList(val) {
        this.oeOrderLinesAllList = val;
      }
    
      settaxAmounts(val1) {
        this.taxAmounts = val1;
      }
     
}

