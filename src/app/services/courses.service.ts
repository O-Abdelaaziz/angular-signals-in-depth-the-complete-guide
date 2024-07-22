import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private httpClient = inject(HttpClient);
  private env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.httpClient.get<GetCoursesResponse>(
      `${this.env.apiRoot}/courses`
    );
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.httpClient.post<Course>(
      `${this.env.apiRoot}/courses`,
      course
    );
    const response = firstValueFrom(course$);
    return response;
  }

  async updateCourse(
    courseId: number,
    course: Partial<Course>
  ): Promise<Course> {
    const course$ = this.httpClient.put<Course>(
      `${this.env.apiRoot}/courses/${courseId}`,
      course
    );
    const response = firstValueFrom(course$);
    return response;
  }

  async deleteCourse(courseId: number): Promise<Course> {
    const course$ = this.httpClient.delete<Course>(
      `${this.env.apiRoot}/courses/${courseId}`
    );
    const response = firstValueFrom(course$);
    return response;
  }
}
