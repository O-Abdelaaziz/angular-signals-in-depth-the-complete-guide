import {
  Component,
  computed,
  effect,
  inject,
  Injector,
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

type Counter = {
  value: number;
};

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public counter = signal(0);

  tenCounter = computed(() => {
    const val = this.counter();
    return val * 10;
  });

  hundredCounter = computed(() => {
    const val = this.counter();
    return val * 100;
  });

  public increment() {
    this.counter.update((val) => val + 1);
  }
  public decrement() {
    const currentCounter = this.counter();
    if (currentCounter > 0) {
      this.counter.update((val) => val - 1);
    }
  }
}
