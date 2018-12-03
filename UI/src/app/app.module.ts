import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { DemoService } from './app.service'; 
import { AppComponentinit } from './app.componentinit';
import { AppComponent } from './app.component';
import { AppComponenttwo } from './app.componenttwo';
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "table1",
    component: AppComponent
  },
  {
    path: "table2",
    component: AppComponenttwo
  },
    {
      path: '**',
      component: AppComponent
    }
];

@NgModule({
  declarations: [
  	AppComponentinit,
    AppComponent,
    AppComponenttwo
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [DemoService],
  bootstrap: [AppComponentinit]
})
export class AppModule { }
