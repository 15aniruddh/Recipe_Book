import { HostListener, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import { SearchHistoryService } from '../../shared/search-history.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

type SearchMode = 'recipe' | 'ingredient';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit {
  mode: SearchMode = 'recipe';
  query = '';
  popularRecipes: { recipe: Recipe; index: number }[] = [];
  showHistory = false;

  private touchStartX: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    public searchHistoryService: SearchHistoryService
  ) {}

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'] === 'ingredient' ? 'ingredient' : 'recipe';

    if (this.recipeService.getRecipes().length === 0) {
      this.dataStorageService.fetchRecipes().subscribe(() => this.loadPopular());
    } else {
      this.loadPopular();
    }
  }

  onSearch() {
    if (!this.query.trim()) {
      return;
    }
    this.searchHistoryService.add(this.query);
    const queryParams = this.mode === 'ingredient' ? { ing: this.query } : { q: this.query };
    this.router.navigate(['/recipes/results'], { queryParams });
  }

  onToggleHistory() {
    this.showHistory = !this.showHistory;
  }

  onSearchHistoryTerm(term: string) {
    this.query = term;
    this.onSearch();
  }

  onSwitchMode() {
    if (this.mode === 'recipe') {
      this.router.navigate(['/recipes/search-ingredients']);
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.touchStartX === null) {
      return;
    }
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(deltaX) < 50) {
      return;
    }
    if ((deltaX < 0 && this.mode === 'recipe') || (deltaX > 0 && this.mode === 'ingredient')) {
      this.onSwitchMode();
    }
  }

  private loadPopular() {
    this.popularRecipes = this.recipeService
      .getRecipes()
      .slice(0, 5)
      .map((recipe, index) => ({ recipe, index }));
  }
}
