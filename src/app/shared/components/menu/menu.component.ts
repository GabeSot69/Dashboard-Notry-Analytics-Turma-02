import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { DrawerModule } from 'primeng/drawer';

import { SidebarService } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MenuModule, DrawerModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  isOpen = true;
  mobileOpen = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.visible$.subscribe(val => {
      this.isOpen = val;
    });

    this.sidebarService.mobileVisible$.subscribe(val => {
      this.mobileOpen = val;
    });
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
          },
        ],
      },
      {
        label: 'Perfil',
        items: [
          {
            label: 'Configurações',
            icon: 'pi pi-cog',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }

  onDrawerChange(val: boolean) {
    if (!val) {
      this.sidebarService.closeMobile();
    }
  }
}
