import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FavouritesService } from '../../shared/favourites.service';
import { RatingService } from '../../shared/rating.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;

  id: number;
  showDirections = false;
  shareMessage: string = null;
  similarRecipes: { recipe: Recipe; index: number }[] = [];

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private favouritesService: FavouritesService,
              private ratingService: RatingService) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        this.showDirections = false;
        this.loadSimilarRecipes();
      }
    );
  }

  get isFavourite(): boolean {
    return this.recipe ? this.favouritesService.isFavourite(this.recipe.name) : false;
  }

  get rating(): number {
    return this.recipe ? this.ratingService.getRating(this.recipe.name) : 0;
  }

  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  onToggleFavourite() {
    this.favouritesService.toggle(this.recipe.name);
  }

  onSetRating(stars: number) {
    this.ratingService.setRating(this.recipe.name, stars);
  }

  onToggleDirections() {
    this.showDirections = !this.showDirections;
  }

  onShare() {
    const shareData = { title: this.recipe.name, text: this.recipe.description, url: window.location.href };
    if ((navigator as any).share) {
      (navigator as any).share(shareData).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.shareMessage = 'Link copied to clipboard!';
      setTimeout(() => (this.shareMessage = null), 2000);
    }
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  private loadSimilarRecipes() {
    this.similarRecipes = this.recipeService
      .getRecipes()
      .map((recipe, index) => ({ recipe, index }))
      .filter(({ index }) => index !== this.id)
      .slice(0, 3);
  }

}
