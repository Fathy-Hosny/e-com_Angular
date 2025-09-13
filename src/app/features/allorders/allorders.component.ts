import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AllordersService } from './services/allorders.service';
import { Allorders } from './models/allorders.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly authService = inject(AuthService);
  private readonly allOrdersService = inject(AllordersService);

  userId: string | null = null;

  ordersList: Allorders[] = [];

  ngOnInit(): void {
    this.getDecodedTokenData();
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
    
        this.ordersList = res;
      },
    });
  }
}
