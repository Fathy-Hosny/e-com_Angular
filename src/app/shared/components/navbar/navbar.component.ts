import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/service/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WischlistService } from '../../../features/wischlist/services/wischlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly cartService = inject(CartService);
  private readonly wischlistService = inject(WischlistService);
  private readonly id = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);

  @Input({ required: true }) islogin!: boolean;

  scroll: boolean = false;

  isLoding: boolean = false;
  count!: number;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCardNumber();
    if (isPlatformBrowser(this.id)) {
      this.getAllCardNumber();
    }
  }

  getCardNumber(): void {
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  getAllCardNumber(): void {
    this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
      },
    });
  }

  @ViewChild('myNav') myNav!: ElementRef;
  @HostListener('window:scroll')
  onscroll(): void {
    if (scrollY > 0) {
      this.myNav.nativeElement.classList.add('py-4', 'colo');
    } else {
      this.scroll = false;
      this.myNav.nativeElement.classList.remove('py-4', 'colo');
    }
  }

  signOut(): void {
    this.isLoding = true;
    setTimeout(() => {
      this.authService.logout();
      this.isLoding = false;
    }, 1000);
  }
}
