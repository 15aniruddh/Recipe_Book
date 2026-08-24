import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit, OnDestroy {
  uploadedRecipes: Recipe[] = [];
  isSyncing = false;

  private changeSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.changeSub = this.recipeService.recipeChanged.subscribe(
      (recipes) => (this.uploadedRecipes = recipes)
    );
    if (this.recipeService.getRecipes().length === 0) {
      this.dataStorageService
        .fetchRecipes()
        .subscribe((recipes) => (this.uploadedRecipes = recipes));
    } else {
      this.uploadedRecipes = this.recipeService.getRecipes();
    }
  }

  onSave() {
    this.isSyncing = true;
    this.dataStorageService.storeRecipes();
    setTimeout(() => (this.isSyncing = false), 600);
  }

  onFetch() {
    this.isSyncing = true;
    this.dataStorageService.fetchRecipes().subscribe(() => (this.isSyncing = false));
  }

  ngOnDestroy() {
    this.changeSub?.unsubscribe();
  }
}
