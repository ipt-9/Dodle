import { Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {HomeComponent} from "./home/home.component";
import {RouteComponent} from "./route/route.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {IntroductionComponent} from "./introduction/introduction.component";
import {RoutedetailComponent} from "./routedetail/routedetail.component";

export const routes: Routes = [
  { path: 'test', component: TestComponent},
  { path: 'route/:id', component: RouteComponent},
  { path: 'introduction/:id', component: IntroductionComponent},
  {path: 'routedetail/:id', component: RoutedetailComponent},
  { path: '', component: HomeComponent},
  {path: '**', component: NotFoundPageComponent},
];
