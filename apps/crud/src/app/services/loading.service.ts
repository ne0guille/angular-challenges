import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingBs = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingBs.asObservable();

  constructor(private http: HttpClient) {}

  showLoading() {
    this.isLoadingBs.next(true);
  }

  hideLoading() {
    this.isLoadingBs.next(false);
  }
}
