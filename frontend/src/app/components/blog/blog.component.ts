import {Component, Input, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";
import {DataService} from "../../services/data/data.service";
import {NgxPaginationModule} from "ngx-pagination";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {SummaryPipe} from "../../pipes/summary.pipe";

@Component({
  selector: 'blog',
    imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe, NgxPaginationModule, MatCard, MatCardContent, MatPaginator, MatCardImage, SummaryPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  standalone: true,
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  @Input() filterText: string = '';
  public items$: any;
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private service: DataService, private router : Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
        this.items$ = response;
    })
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/blog/detail', id]);
  }

}
