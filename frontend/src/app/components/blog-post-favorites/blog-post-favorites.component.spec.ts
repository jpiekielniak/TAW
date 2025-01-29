import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostFavoritesComponent } from './blog-post-favorites.component';

describe('BlogPostFavoritesComponent', () => {
  let component: BlogPostFavoritesComponent;
  let fixture: ComponentFixture<BlogPostFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPostFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
