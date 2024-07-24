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
import { catchError, count, from, interval, startWith, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { LoadingIndicatorComponent } from '../loading/loading.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent,
    LoadingIndicatorComponent,
  ],
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
  private messagesService = inject(MessagesService);
  private matDialog = inject(MatDialog);

  injector = inject(Injector);
  // courses$ = toObservable(this.#courses);
  courses$ = from(this.coursesService.loadAllCourses());

  constructor() {
    // effect(() => {
    //   console.log('Beginner Courses: ', this.beginnerCourses().length);
    //   console.log('Advanced Courses: ', this.advancedCourses().length);
    // });
    // this.courses$.subscribe((courses) => console.log(courses));
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
      this.messagesService.showMessage(
        'Something went wrong: ' + error,
        'error'
      );
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
    if (!newCourse) {
      return;
    }
    const newCourses = [...this.#courses(), newCourse];
    this.#courses.set(newCourses);
  }

  public onToObservable() {
    // const courses$ = toObservable(this.#courses, { injector: this.injector });
    // courses$.subscribe((courses) => console.log(courses));
    // const numbers=signal(0);
    // numbers.set(10);
    // numbers.set(20);
    // numbers.set(30);
    // const numbers$=toObservable(numbers,{injector:this.injector});
    // numbers.set(40);
    // numbers$.subscribe(console.log);
    // numbers.set(40);
    // just this will be printed -
    // angular is going to wait for signal to stabilize in the end of change detection run and then only the lats value set it will be printed as the last value
    //  numbers.set(50);
  }

  public onToSignal() {
    // const courses = toSignal(this.courses$, { injector: this.injector });
    // effect(() => {
    //   console.log('courses:', courses());
    // },{
    //   injector: this.injector
    // });
    // const number$ = interval(1000).pipe(startWith(0)); if you add requireSync equals true in toSignal config
    const number$ = interval(1000);
    const numbers = toSignal(number$, {
      injector: this.injector,
      initialValue: 0,
    });

    effect(
      () => {
        console.log('numbers:', numbers());
      },
      {
        injector: this.injector,
      }
    );
  }
}
