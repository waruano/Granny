import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";

import { PlaceFinderComponent } from "src/components/place-finder/place-finder.component";
import { Browser } from "protractor";

@NgModule({
  declarations: [PlaceFinderComponent],
  exports: [PlaceFinderComponent],
  entryComponents: [PlaceFinderComponent],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SharedModule {}
