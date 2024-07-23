import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import { isUserAuthenticatedGuard } from './guards/is-user-authenticated.guard';
import { CourseCategoryComboboxComponent } from './course-category-combobox/course-category-combobox.component';
import { CourseComponent } from './course/course.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[isUserAuthenticatedGuard]
  },
  {
    path: "courses/:courseId",
    component: CourseComponent
  },
  {
    path: "login",
    component: LoginComponent 
  },
  {
    path: "lessons",
    component: LessonsComponent,
    canActivate:[isUserAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
