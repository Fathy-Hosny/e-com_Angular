import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Allorders } from '../../../features/allorders/models/allorders.interface';
import { AllordersService } from '../../../features/allorders/services/allorders.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly allOrdersService = inject(AllordersService);

  userId: string | null = null;

  UserList: Allorders[] = [];

  ngOnInit(): void {
   this.getDecodedTokenData();
 this.checkuser()
  }

  checkuser():void{

    if (this.userId) {
      this.getIduserOrdersData(this.userId);
    }
  }

  getDecodedTokenData(): void {
    const res: any = this.authService.decodetoken();
    if (res) {
      this.userId = res.id;
    }
  }

  getIduserOrdersData(id: string): void {
    this.allOrdersService.getIduserOrders(id).subscribe({
      next: (res) => {
        console.log('Orders: ', res);
        this.UserList = res;
      },
    });
  }
}
