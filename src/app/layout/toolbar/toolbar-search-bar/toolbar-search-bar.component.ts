import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavItem } from '../../sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from '../../sidenav/sidenav.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'fury-toolbar-search-bar',
  templateUrl: './toolbar-search-bar.component.html',
  styleUrls: ['./toolbar-search-bar.component.scss']
})
export class ToolbarSearchBarComponent implements OnInit {

  input: string;
  focused: boolean;

  recentlyVisited: SidenavItem[] = [];
  searchSubject = new Subject<string>();
  filteredItems: SidenavItem[] = [];

  constructor(
    private router: Router,
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    //this.setupDemoData();
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {

    //     const item = this.sidenavService.getItemByRoute(event.urlAfterRedirects);

    //     if (item) {
    //       const index = this.recentlyVisited.indexOf(item);
    //       if (index > -1) {
    //         this.recentlyVisited.splice(index, 1);
    //       }

    //       this.recentlyVisited.unshift(item);

    //       if (this.recentlyVisited.length > 5) {
    //         this.recentlyVisited.pop();
    //       }
    //     }
    //   }
    // });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const item = this.sidenavService.getItemByRoute(event.urlAfterRedirects);

        if (item) {
          this.addRecentlyVisited(item);
        }
      }
    });

    // Populate recentlyVisited array with your own data
    //this.setupDemoData();
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300 milliseconds after the last input
        distinctUntilChanged() // Ignore if the input is the same as the previous one
      )
      .subscribe((searchTerm: string) => {
        // Call the method to filter items based on the search term
        this.filterItems(searchTerm);
      });
  }

  onSearchInputChanged(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  filterItems(searchTerm: string) {
    // Implement the logic to filter items based on the search term
    // For example, you can filter items that contain the search term in their name
    this.filteredItems = this.recentlyVisited.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setupDemoData() {
    // Call your existing logic to fetch and add items to recentlyVisited
    this.addRecentlyVisited(this.sidenavService.getItemByRoute('/editor'));
    this.addRecentlyVisited(this.sidenavService.getItemByRoute('/dashboard'));
    this.addRecentlyVisited(this.sidenavService.getItemByRoute('/user'));
    // ... add other items as needed
  }

  addRecentlyVisited(item: SidenavItem) {
    if (item) {
      const index = this.recentlyVisited.indexOf(item);
      if (index > -1) {
        this.recentlyVisited.splice(index, 1);
      }

      this.recentlyVisited.unshift(item);

      if (this.recentlyVisited.length > 5) {
        this.recentlyVisited.pop();
      }
    }
  }

  setupDemoData2() {
    const editor = this.sidenavService.getItemByRoute('/editor');
    if (editor) this.recentlyVisited.push(editor);

    const dashboard = this.sidenavService.getItemByRoute('/dashboard');
    if (dashboard) this.recentlyVisited.push(dashboard);

    const user = this.sidenavService.getItemByRoute('/user');
    if (user) this.recentlyVisited.push(user);

    const censorship = this.sidenavService.getItemByRoute('/censorship');
    if (censorship) this.recentlyVisited.push(censorship);

    const report = this.sidenavService.getItemByRoute('/report');
    if (report) this.recentlyVisited.push(report);

    const family = this.sidenavService.getItemByRoute('/family');
    if (report) this.recentlyVisited.push(family);

    const drinking = this.sidenavService.getItemByRoute('/drinking');
    if (drinking) this.recentlyVisited.push(drinking);

    const music = this.sidenavService.getItemByRoute('/music');
    if (music) this.recentlyVisited.push(music);

    const work = this.sidenavService.getItemByRoute('/work');
    if (work) this.recentlyVisited.push(work);

    const status = this.sidenavService.getItemByRoute('/status');
    if (status) this.recentlyVisited.push(status);

    const smoking = this.sidenavService.getItemByRoute('/smoking');
    if (smoking) this.recentlyVisited.push(smoking);

    const purpose = this.sidenavService.getItemByRoute('/purpose');
    if (purpose) this.recentlyVisited.push(purpose);

    const literacy = this.sidenavService.getItemByRoute('/literacy');
    if (literacy) this.recentlyVisited.push(literacy);

    const habit = this.sidenavService.getItemByRoute('/habit');
    if (habit) this.recentlyVisited.push(habit);

    const reason = this.sidenavService.getItemByRoute('/reason');
    if (reason) this.recentlyVisited.push(reason);

    const exercise = this.sidenavService.getItemByRoute('/exercise');
    if (exercise) this.recentlyVisited.push(exercise);

    const expecting = this.sidenavService.getItemByRoute('/expecting');
    if (expecting) this.recentlyVisited.push(expecting);

    const hobby = this.sidenavService.getItemByRoute('/hobby');
    if (hobby) this.recentlyVisited.push(hobby);

    const pet = this.sidenavService.getItemByRoute('/pet');
    if (pet) this.recentlyVisited.push(pet);

    const singer = this.sidenavService.getItemByRoute('/singer');
    if (singer) this.recentlyVisited.push(singer);

    const school = this.sidenavService.getItemByRoute('/school');
    if (school) this.recentlyVisited.push(school);
  }

  isItemMatched(item: string): boolean {
    return this.input && item.toLowerCase().includes(this.input.toLowerCase());
  }

  //   isItemMatched(item: string): boolean {
  //   const lowerCaseInput = this.input.toLowerCase();
  //   const isMatched = this.input && item.toLowerCase().includes(lowerCaseInput);

  //   if (isMatched) {
  //     // Check if the item is not already in recentlyVisited
  //     const isNotInRecentlyVisited = !this.recentlyVisited.some((visitedItem) =>
  //       visitedItem.routeOrFunction.toLowerCase().includes(lowerCaseInput)
  //     );

  //     // If it's not in recentlyVisited, add it
  //     if (isNotInRecentlyVisited) {
  //       const newItem = this.sidenavService.getItemByRoute(item);
  //       if (newItem) {
  //         this.addRecentlyVisited(newItem);
  //       }
  //     }
  //   }

  //   return isMatched;
  // }


  updateRecentlyVisited(item: SidenavItem) {
    this.addRecentlyVisited(item);
  }

  updateRecentlyVisited2(item: SidenavItem) {
    const index = this.recentlyVisited.indexOf(item);
    if (index > -1) {
      this.recentlyVisited.splice(index, 1);
    }

    this.recentlyVisited.unshift(item);

    if (this.recentlyVisited.length > 5) {
      this.recentlyVisited.pop();
    }
  }

  openDropdown() {
    this.focused = true;
  }

  closeDropdown() {
    this.focused = false;
  }

}
