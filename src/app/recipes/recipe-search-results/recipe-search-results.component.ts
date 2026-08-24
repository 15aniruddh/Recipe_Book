import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import { FavouritesService } from '../../shared/favourites.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

interface ResultCard {
  recipe: Recipe;
  index: number;
  views: string;
}

// Loose category tags for the demo recipes so the "What to Cook?" filter works.
const RECIPE_TAGS: { [name: string]: string[] } = {
  Pancakes: ['Desserts & Sweets', 'Quick & Easy Supper'],
  'Cassava pizza': ['Main Courses'],
  'Spaghetti Bolognese': ['Main Courses', 'Quick & Easy Supper'],
  'Chicken Handi': ['Main Courses', 'International Flavors'],
  'Beef pho': ['International Flavors', 'Healthy Eats'],
  'Chicken Quinoa Greek Salad': ['Salads & Sides', 'Healthy Eats'],
  'Vegan Chocolate Cake': ['Desserts & Sweets', 'Vegetarian Delights'],
  Lasagne: ['Main Courses'],
  Sushi: ['International Flavors', 'Appetizers'],
  'Fish pie': ['Main Courses'],
};

@Component({
  selector: 'app-recipe-search-results',
  templateUrl: './recipe-search-results.component.html',
  styleUrls: ['./recipe-search-results.component.css'],
})
export class RecipeSearchResultsComponent implements OnInit {
  results: ResultCard[] = [];
  query = '';
  isSearch = false;

  categories = [
    'All Types',
    'Appetizers',
    'Main Courses',
    'Salads & Sides',
    'Vegetarian Delights',
    'International Flavors',
    'Desserts & Sweets',
    'Healthy Eats',
    'Quick & Easy Supper',
  ];
  activeCategory = 'All Types';

  private allRecipes: { recipe: Recipe; index: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || params['ing'] || '';
      this.isSearch = !!(params['q'] || params['ing']);
      if (this.recipeService.getRecipes().length === 0) {
        this.dataStorageService.fetchRecipes().subscribe(() => this.init(params));
      } else {
        this.init(params);
      }
    });
  }

  isFavourite(name: string): boolean {
    return this.favouritesService.isFavourite(name);
  }

  onToggleFavourite(name: string) {
    this.favouritesService.toggle(name);
  }

  onSelectCategory(category: string) {
    this.activeCategory = category;
    this.applyFilter();
  }

  private init(params: { [key: string]: string }) {
    this.allRecipes = this.recipeService
      .getRecipes()
      .map((recipe, index) => ({ recipe, index }));

    const nameQuery = (params['q'] || '').toLowerCase().trim();
    const ingredientQuery = (params['ing'] || '').toLowerCase().trim();

    if (nameQuery || ingredientQuery) {
      this.allRecipes = this.allRecipes.filter(({ recipe }) => {
        if (nameQuery) {
          return recipe.name.toLowerCase().includes(nameQuery);
        }
        return (recipe.ingredients || []).some((ing) =>
          ing.name.toLowerCase().includes(ingredientQuery)
        );
      });
    }

    this.applyFilter();
  }

  private applyFilter() {
    const filtered =
      this.activeCategory === 'All Types'
        ? this.allRecipes
        : this.allRecipes.filter(({ recipe }) =>
            (RECIPE_TAGS[recipe.name] || []).includes(this.activeCategory)
          );

    this.results = filtered.map(({ recipe, index }) => ({
      recipe,
      index,
      views: this.viewsFor(recipe.name),
    }));
  }

  // Deterministic pseudo view-count so cards feel populated.
  private viewsFor(name: string): string {
    const base = 80 + (name.length * 37) % 320;
    return `${base}+`;
  }
}
