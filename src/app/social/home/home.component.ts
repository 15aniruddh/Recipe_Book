import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { AppNotification, NotificationsService } from '../../shared/notifications.service';
import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayName = '';
  isAuthenticated = false;
  notifications: AppNotification[] = [];
  showNotifications = false;
  featured: { recipe: Recipe; index: number }[] = [];
  heroImage = '';

  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        const localPart = user.email.split('@')[0];
        this.displayName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
      } else {
        this.displayName = 'Guest';
      }
    });
    this.notifications = this.notificationsService.list();

    if (this.recipeService.getRecipes().length === 0) {
      this.dataStorageService.fetchRecipes().subscribe(() => this.loadFeatured());
    } else {
      this.loadFeatured();
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  onClearNotifications() {
    this.notificationsService.clear();
    this.notifications = [];
  }

  private loadFeatured() {
    const recipes = this.recipeService.getRecipes();
    this.featured = recipes
      .map((recipe, index) => ({ recipe, index }))
      .slice(0, 6);
    this.heroImage = recipes.length ? recipes[0].imagePath : '';
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
