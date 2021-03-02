export class PaymentObj {
    totAmount : number;
    suppId:number;
     supplierSiteId: number;
      ouId: number;
       partyId: number;
     bankAccountNo: string;
     suppNo: number;
     docCategoryCode: string;
     paymentMehtodId: number;
     paymentNarration: string;
     paymentDocName:string;
     invPayment:any[];
     getInvPayment(){
         return this.invPayment;
     }
     setInvPayment(val){
         this.invPayment=val;
     }
}


