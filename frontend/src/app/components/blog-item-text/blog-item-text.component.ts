import {Component, Input} from '@angular/core';
import {SummaryPipe} from "../../pipes/summary.pipe";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'blog-item-text',
  templateUrl: './blog-item-text.component.html',
  standalone: true,
  imports: [SummaryPipe, RouterModule],
  styleUrl: './blog-item-text.component.css'
})
export class BlogItemTextComponent {

  @Input() text?: string;
  @Input() id?: number;

}
