import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SocialRoutingModule } from './social-routing.module';
import { HomeComponent } from './home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    FavouritesComponent,
    UploadsComponent,
    ProfileComponent,
  ],
  imports: [FormsModule, SharedModule, SocialRoutingModule],
})
export class SocialModule {}
