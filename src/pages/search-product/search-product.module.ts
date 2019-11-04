import { SharedModule } from "./../../app/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SearchProductPage } from "./search-product.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: SearchProductPage
      }
    ]),
    SharedModule
  ],
  declarations: [SearchProductPage]
})
export class SearchProducModule {}
