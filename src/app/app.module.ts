import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HttpClientModule } from '@angular/common/http';
import { OnePostComponent } from './one-post/one-post.component';
import { SearchComponent } from './search/search.component';
import { SeachResultComponent } from './seach-result/seach-result.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent,
    OnePostComponent,
    SearchComponent,
    SeachResultComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
