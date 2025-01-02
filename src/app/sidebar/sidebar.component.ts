import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeLink: number = 0;

  sidebarLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: '📦' },
    // { path: '/dashboard/addproduct', name: 'Product', icon: '🛒' },
    // { path: '/dashboard/insights', name: 'Insights', icon: '📂' },
    { path: '/dashboard/products', name: 'Products', icon: '🛒' },
    // { path: '/dashboard/admin', name: 'Reseller', icon: '👤' },
    // { path: '/dashboard/seller',name: 'Manage Sellser', icon: '👥' },
    // { path: '/dashboard/webcontent', name: 'Website Content', icon: '🏢' },
    // { path: '/dashboard/billingdashboard', name: 'Billing Dashboard', icon: '💳' },
  ];
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Update active link on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });

    // Set active link initially
    this.updateActiveLink();
  }

  setActiveLink(index: number): void {
    this.activeLink = index;
  }

  private updateActiveLink(): void {
    const currentPath = this.router.url;
    const index = this.sidebarLinks.findIndex((link) => link.path === currentPath);
    this.activeLink = index >= 0 ? index : 0; // Default to the first link if no match
  }
}
