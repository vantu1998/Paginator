import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }

  @Input() length;
  @Input() pageSize;
  @Input() pageSizeOptions;
  @Input() pageIndex;
  @Output() changePage = new EventEmitter<PageEvent>();
  @Input() sizeItem = 5;
  tootlePage: number;
  pageItems: number[] = [];
  ngOnInit(): void {
    this.calTootlePage();
    this.paginator.page.subscribe((data) => {
      console.log(data);
      this.pageSize = data.pageSize;
      this.calTootlePage();
      this.changePage.emit(data);
    });
  }

  calTootlePage(): void {
    this.pageItems = [];
    this.tootlePage = Math.ceil(this.length / this.pageSize);
    for (let i = 1; i <= this.tootlePage; i++) {
      this.pageItems.push(i);
    }
  }

  goToPage(i): void {
    const previousIndex = this.paginator.pageIndex;
    this.pageIndex = i;
    this.paginator.page.next({
      previousPageIndex: previousIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  goToPreviousPage(): void {
    this.paginator.previousPage();
  }
  goToNextPage(): void {
    this.paginator.nextPage();
  }

  goToFirstPage(): void {
    this.goToPage(0);
  }
  goToLastPage(): void {
    this.goToPage(this.tootlePage - 1);
  }
}
