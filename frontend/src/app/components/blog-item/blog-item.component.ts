import {Component, Input} from '@angular/core';
import {BlogItemImageComponent} from "../blog-item-image/blog-item-image.component";
import {BlogItemTextComponent} from "../blog-item-text/blog-item-text.component";

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent],
  styleUrl: './blog-item.component.css'
})
export class BlogItemComponent {
  @Input() image?: string;
  @Input() text?: string;
  @Input() title?: string;
  @Input() id?: number;
}
