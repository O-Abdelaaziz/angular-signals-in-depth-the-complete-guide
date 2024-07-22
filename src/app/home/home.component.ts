import {
  afterNextRender,
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Injector,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, count, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public courses = signal<Course[]>([]);

  private coursesService = inject(CoursesServiceWithFetch);

  // public async loadCourses() {
  //   await this.coursesService
  //     .loadAllCourses()
  //     .then((courses) => this.courses.set(courses))
  //     .catch((error) => console.log('Something went wrong: ', error));
  // }

  constructor(){
    afterNextRender(()=>{
      this.loadCourses();
    })
  }

  // ngOnInit(): void {
  //   this.loadCourses();
  // }

  public async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
      console.log('Courses Counts:', courses.length);
    } catch (error) {
      console.log('Something went wrong: ', error);
    }
  }
}
