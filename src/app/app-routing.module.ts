import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { SeachResultComponent } from './seach-result/seach-result.component';

const routes: Routes = [
  {path:"",component:PlaceholderComponent},
  {path:"search",component:SeachResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
