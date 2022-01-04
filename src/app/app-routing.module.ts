import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { SeachResultComponent } from './seach-result/seach-result.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  { path: '', component: PlaceholderComponent },

  { path: 'create', component: CreateComponent },
  { path: 'search', component: SeachResultComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'post/:id', component: PostDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
