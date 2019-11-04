import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "./../../app/shared.module";
import { AddProductPage } from "./add-product.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: AddProductPage
      }
    ]),
    SharedModule
  ],
  declarations: [AddProductPage]
})
export class AddProductModule {}
