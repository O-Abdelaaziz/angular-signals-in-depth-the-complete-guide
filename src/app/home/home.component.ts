import { LoadingService } from './../loading/loading.service';
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
import { LoadingIndicatorComponent } from "../loading/loading.component";

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent, LoadingIndicatorComponent],
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
  private loadingService = inject(LoadingService);
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
      this.loadingService.loadingOn()
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
      console.log('Courses Counts:', courses.length);
    } catch (error) {
      console.log('Something went wrong: ', error);
    } finally{
      this.loadingService.loadingOff()
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
      this.loadingService.loadingOn()
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      console.log('An Error occurred: ', error);
    }finally{
      this.loadingService.loadingOff()
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
