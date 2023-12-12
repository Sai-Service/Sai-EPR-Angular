import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import{ HTTP_INTERCEPTORS}from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from "ng-sidebar";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MasterModule} from './master/master.module';
import { TransactionModule } from './transaction/transaction.module';
import { BankModule} from './bank/bank.module';
import { OrderManagementModule} from './order-management/order-management.module';
import { ServiceModule } from './service/service.module';
import { faMasterModule} from './fixed-asset/famaster.module';
import { PaintModule} from './paint/paint.module';
import { PumpModule} from './pump/pump.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

//import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { App } from './app';

//
// import { PageNotFouundComponent } from './page-not-fouund/page-not-fouund.component';
import { DashboardComponent } from './master/dashboard/dashboard.component';
import { PoReceiptFormComponent } from './master/po-receipt-form/po-receipt-form.component';
//import { DeActivateGuard } from './de-activate.guard';
import { FaCommanMasterComponent } from './fixed-asset/fa-master/fa-comman-master/fa-comman-master.component';
import { AllReportsComponent } from './report/all-reports.component';

// import { NgxSpinnerModule } from "ngx-spinner"; 
@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    PoReceiptFormComponent,
    FaCommanMasterComponent,
    AllReportsComponent,
    
    
   
  
    // CounterSaleReturnComponent,
    // ItemLocatorMasterComponent,



    // FlexFieldComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
   // NgxDaterangepickerMd.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    AdminModule,
    MasterModule,
    ChartsModule,
    TransactionModule,
    BankModule,
    OrderManagementModule,
    ServiceModule,
    faMasterModule,
    PaintModule,
    PumpModule,
    // NgxSpinnerModule
  ],
  providers: [
     {provide : LocationStrategy , useClass: HashLocationStrategy},
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   //useClass: HttpErrorInterceptorInterceptor,
    //   multi: true
    // },
    // DeActivateGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
