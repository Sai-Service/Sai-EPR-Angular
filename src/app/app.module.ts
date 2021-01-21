import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { DaterangepickerModule } from 'angular-2-daterangepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from "ng-sidebar";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MasterModule} from './master/master.module';
import {TransactionModule } from './transaction/transaction.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

//import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { App } from './app';

import { from } from 'rxjs';
import { PageNotFouundComponent } from './page-not-fouund/page-not-fouund.component';
import { DashboardComponent } from './master/dashboard/dashboard.component';
import { PoReceiptFormComponent } from './master/po-receipt-form/po-receipt-form.component';
// import { FlexFieldComponent } from './flex-field/flex-field.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFouundComponent,
    DashboardComponent,
    PoReceiptFormComponent,
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
    // DaterangepickerModule
    // NgbModule.forRoot(),
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
