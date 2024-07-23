import { courseResolver } from './course/course.resolver';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LessonsComponent } from './lessons/lessons.component';
import { isUserAuthenticatedGuard } from './guards/is-user-authenticated.guard';
import { CourseComponent } from './course/course.component';
import { courseLessonResolver } from './course/course.lesson.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticatedGuard],
  },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    canActivate: [isUserAuthenticatedGuard],
    resolve: {
      course: courseResolver,
      lessons: courseLessonResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [isUserAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
