import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;
  tokenPayload: any;
  username: string = '';

  constructor(private router: Router, private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = jwtDecode(token);
    this.username = this.capitalizeFirstLetter(tokenPayload.sub);
    this.initializeTokenPayload();
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private initializeTokenPayload() {
    const token = localStorage.getItem('token');
    this.tokenPayload = jwtDecode(token);
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    this.sidenavService.clearItems();
    // Redirect to the login page or any other desired route
    this.router.navigate(['/login']);
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
