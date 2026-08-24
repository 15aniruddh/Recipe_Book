import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AlertComponent } from "./alert/alert.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { CardGridItemComponent } from "./card-grid-item/card-grid-item.component";
import { AvatarComponent } from "./avatar/avatar.component";

@NgModule({
    declarations: [AlertComponent, TopBarComponent, CardGridItemComponent, AvatarComponent],
    imports: [CommonModule, RouterModule],
    exports: [CommonModule, RouterModule, AlertComponent, TopBarComponent, CardGridItemComponent, AvatarComponent]
})

export class SharedModule {

}
