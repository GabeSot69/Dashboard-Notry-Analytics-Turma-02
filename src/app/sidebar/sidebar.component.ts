import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { NgClass } from "../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(public sidebarService: SidebarService) { }

  toggleMenu() {
    if (window.innerWidth >= 768) {
      this.sidebarService.toggle();
    } else {
      this.sidebarService.openMobile();
    }
  }
}
