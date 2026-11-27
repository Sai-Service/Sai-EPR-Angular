
import { Component, NgModule, VERSION, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'erpReplica';
  devToolsOpen = false;
  private devToolsCheckInterval: any;

  ngOnInit() {
    this.devToolsCheckInterval = setInterval(() => this.checkDevTools(), 500);
  }

  ngOnDestroy() {
    if (this.devToolsCheckInterval) {
      clearInterval(this.devToolsCheckInterval);
    }
  }

  private checkDevTools() {
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const sizeDetected = widthDiff > threshold || heightDiff > threshold;

    const start = performance.now();
    // tslint:disable-next-line:no-debugger
    debugger;
    const timingDetected = (performance.now() - start) > 100;

    this.devToolsOpen = sizeDetected || timingDetected;
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const isDevToolsShortcut =
      key === 'F12' ||
      (event.ctrlKey && event.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')) ||
      (event.ctrlKey && (key === 'U' || key === 'u'));

    if (isDevToolsShortcut) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
