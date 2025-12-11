import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {

  private _visible = new BehaviorSubject<boolean>(true);
  visible$ = this._visible.asObservable();

  // mobile
  private _mobileVisible = new BehaviorSubject<boolean>(false);
  mobileVisible$ = this._mobileVisible.asObservable();

  toggle() { this._visible.next(!this._visible.value); }

   close() {
    this._visible.next(false);
  }

  openMobile() {
    this._mobileVisible.next(true);
  }

  closeMobile() {
    this._mobileVisible.next(false);
  }
}
