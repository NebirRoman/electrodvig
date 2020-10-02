import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: Array<ICategory> = [];
  main: boolean;
  open = true;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private catService: CategoryService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/main') {
          this.main = false;
        }
        else {
          this.main = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.catService.getFirecloudCategory().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    );
  }
}
