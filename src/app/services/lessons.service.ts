import { inject, Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  env = environment;
  http = inject(HttpClient);

  // public async loadAllLessons(): Promise<Lesson[]> {
  //   const response = await firstValueFrom(this.http.get<GetLessonsResponse>(`${this.env.apiRoot}/lessons`));
  //   return response.lessons;
  // }

  public async loadAllLessons(config: {
    courseId?: string;
    query?: string;
  }): Promise<Lesson[]> {
    const { courseId, query } = config;
    let params = new HttpParams();
    if (courseId) {
      params = params.set('courseId', courseId);
    }
    if (query) {
      params = params.set('query', query);
    }
    const lesson$ = this.http.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`,
      { params }
    );
    const response = await firstValueFrom(lesson$);
    return response.lessons;
  }

   
}
