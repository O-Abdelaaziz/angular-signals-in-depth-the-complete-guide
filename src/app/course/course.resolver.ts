import { CoursesService } from './../services/courses.service';
import { ResolveFn } from '@angular/router';
import { Course } from '../models/course.model';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Course | null> = async (
  route,
  state
) => {
  const courseId = route.paramMap.get('courseId');
  if (!courseId) return null;

  const coursesService = inject(CoursesService);
  return coursesService.loadCourseById(courseId);
};
