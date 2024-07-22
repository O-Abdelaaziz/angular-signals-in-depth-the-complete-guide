import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();
    return payload.courses;
    /**
     * This is done automatically because the use of async/await flags which going to inspect the return type
     * if it promise is going to use promise directly
     * if it primitive type is going to wrap it into Promise.resolve(?)
     */
    //return Promise.resolve(payload.courses) 
    //return payload.courses as Course[];     => But remove the definition form the method :Promise<Course[]>
  }
}
