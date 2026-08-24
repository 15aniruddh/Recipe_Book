import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { FavouritesService } from '../../shared/favourites.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favouriteRecipes: { recipe: Recipe; index: number }[] = [];

  private changeSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private favouritesService: FavouritesService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.changeSub = this.recipeService.recipeChanged.subscribe(() => this.load());
    if (this.recipeService.getRecipes().length === 0) {
      this.dataStorageService.fetchRecipes().subscribe(() => this.load());
    } else {
      this.load();
    }
  }

  onToggleFavourite(name: string) {
    this.favouritesService.toggle(name);
    this.load();
  }

  private load() {
    this.favouriteRecipes = this.recipeService
      .getRecipes()
      .map((recipe, index) => ({ recipe, index }))
      .filter(({ recipe }) => this.favouritesService.isFavourite(recipe.name));
  }

  ngOnDestroy() {
    this.changeSub?.unsubscribe();
  }
}
