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
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  #courses = signal<Course[]>([]);

  public beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category == 'BEGINNER');
  });

  public advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category == 'ADVANCED');
  });

  private coursesService = inject(CoursesService);
  private matDialog = inject(MatDialog);

  constructor() {
    effect(() => {
      console.log('Beginner Courses: ', this.beginnerCourses().length);
      console.log('Advanced Courses: ', this.advancedCourses().length);
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  public async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
      console.log('Courses Counts:', courses.length);
    } catch (error) {
      console.log('Something went wrong: ', error);
    }
  }

  public onCourseUpdated(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map((course) =>
      course.id == updatedCourse.id ? updatedCourse : course
    );
    this.#courses.set(newCourses);
  }

  public async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      console.log('An Error occurred: ', error);
    }
  }
  public async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.matDialog, {
      mode: 'create',
      title: 'Create new course',
    });

    const newCourses = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }
}
