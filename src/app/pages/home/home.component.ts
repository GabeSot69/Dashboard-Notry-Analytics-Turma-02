import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MenuComponent } from '../../menu/menu.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-home',
  imports: [MenuComponent, SidebarComponent, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isOpen = true;
  
    constructor(private sidebarService: SidebarService) {
      this.sidebarService.visible$.subscribe(v => {
        this.isOpen = v;
      });
    }
}
