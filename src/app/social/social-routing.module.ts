import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ProfileComponent } from './profile/profile.component';

// Routes are open so visitors can explore the app before signing in. Saving a
// recipe is the only action that requires authentication (handled in the
// recipe edit component).
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialRoutingModule {}
