import { Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {HomeComponent} from "./home/home.component";
import {RouteComponent} from "./route/route.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {IntroductionComponent} from "./introduction/introduction.component";
import {RoutedetailComponent} from "./routedetail/routedetail.component";
import {FinishComponent} from "./finish/finish.component";
import {FaqComponent} from "./faq/faq.component";

export const routes: Routes = [
  { path: 'test', component: TestComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'route/:id', component: RouteComponent},
  { path: 'introduction/:id', component: IntroductionComponent},
  {path: 'routedetail/:id', component: RoutedetailComponent},
  {path: 'finish/:id', component: FinishComponent},
  { path: '', component: HomeComponent},
  {path: '**', component: NotFoundPageComponent},
];
