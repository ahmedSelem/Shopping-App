import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated : boolean = false;
  private userSubscription? : Subscription;

  constructor (private _dataStorageService : DataStorageService, private _authService : AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this._authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true
      this.isAuthenticated = !!user;
    });
    
  }

  onSaveData() {
    this._dataStorageService.saveData();
  }

  onFetchData() {
    this._dataStorageService.fetchData().subscribe();
  }

  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
