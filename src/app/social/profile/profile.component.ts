import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { FavouritesService } from '../../shared/favourites.service';
import { ProfileService } from '../../shared/profile.service';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  displayName = '';
  isAuthenticated = false;
  favouritesCount = 0;
  uploadsCount = 0;

  about = '';
  likes: string[] = [];

  isEditing = false;
  aboutDraft = '';
  newLike = '';

  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private favouritesService: FavouritesService,
    private profileService: ProfileService,
    private recipeService: RecipeService
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
    this.about = this.profileService.getAbout();
    this.likes = this.profileService.getLikes();
    this.uploadsCount = this.recipeService.getRecipes().length;
    this.favouritesCount = this.favouritesService.list().length;
  }

  onEdit() {
    this.aboutDraft = this.about;
    this.isEditing = true;
  }

  onSave() {
    this.about = this.aboutDraft;
    this.profileService.setAbout(this.about);
    this.profileService.setLikes(this.likes);
    this.isEditing = false;
  }

  onAddLike() {
    const trimmed = this.newLike.trim();
    if (trimmed && !this.likes.includes(trimmed)) {
      this.likes = [...this.likes, trimmed];
    }
    this.newLike = '';
  }

  onRemoveLike(like: string) {
    this.likes = this.likes.filter((l) => l !== like);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
