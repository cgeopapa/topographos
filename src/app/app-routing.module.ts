import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop/desktop.component';
import { IsDesktopService } from './is-desktop.service';
import { IsMobileService } from './is-mobile.service';
import { MobileComponent } from './mobile/mobile.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

const routes: Routes = [
  {path: "", component: DesktopComponent, canActivate: [IsDesktopService]},
  {path: "step1", component: Step1Component, canActivate: [IsDesktopService]},
  {path: "step2", component: Step2Component, canActivate: [IsDesktopService]},
  {path: "step3", component: Step3Component, canActivate: [IsDesktopService]},
  
  {path: "mobile", component: MobileComponent, canActivate: [IsMobileService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
