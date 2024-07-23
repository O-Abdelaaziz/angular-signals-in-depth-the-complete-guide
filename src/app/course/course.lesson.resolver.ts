import { ResolveFn } from '@angular/router';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';
import { inject } from '@angular/core';

export const courseLessonResolver: ResolveFn<Lesson[] | null> = async (
  route,
  state
) => {
  const courseId = route.paramMap.get('courseId');
  if (!courseId){
    return [];
  };

  const lessonsService = inject(LessonsService);
  return lessonsService.loadAllLessons({ courseId });
};
