import { Component } from '@angular/core';
import {BlogComponent} from "./components/blog/blog.component";
import {RouterOutlet} from "@angular/router";
import {BlogItemDetailsComponent} from "./components/blog-item-details/blog-item-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogComponent, BlogItemDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  public counter: number = 0;

  add() {
    this.counter++;
  }

  remove() {
    this.counter--;
  }
}
