import { SearchProvider } from './../providers/products/search';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { PlaceFinderComponent } from "src/components/place-finder/place-finder.component";
import { UserProvider } from './../providers/user/user';
import { Api } from './../providers/api/api';
import { ProductProvider } from '../providers/products/product';

@NgModule({
  declarations: [PlaceFinderComponent],
  exports: [PlaceFinderComponent],
  providers: [UserProvider, Api, ProductProvider, SearchProvider],
  entryComponents: [PlaceFinderComponent],
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule]
})
export class SharedModule {}
