import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { SEED_RECIPES } from './seed-recipes';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  // Seeded with demo recipes so the app has content to browse out of the box.
  private recipes: Recipe[] = [...SEED_RECIPES];

  // Holds a recipe a guest tried to save before authenticating, so it can be
  // committed once they log in. { id: null } means "add new".
  pendingRecipe: { id: number | null; recipe: Recipe } | null = null;

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  // Commits a recipe that was stashed while the user was a guest. Returns the
  // index of the saved recipe so callers can navigate to it, or null if there
  // was nothing pending.
  commitPendingRecipe(): number | null {
    if (!this.pendingRecipe) {
      return null;
    }
    const { id, recipe } = this.pendingRecipe;
    this.pendingRecipe = null;
    if (id === null) {
      this.addRecipe(recipe);
      return this.recipes.length - 1;
    }
    this.updateRecipe(id, recipe);
    return id;
  }
}
