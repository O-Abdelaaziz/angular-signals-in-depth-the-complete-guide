import {
  afterNextRender,
  Component,
  computed,
  effect,
  EffectRef,
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
  public effectRef: EffectRef | null = null;

  tenCounter = computed(() => {
    const val = this.counter();
    return val * 10;
  });

  hundredCounter = computed(() => {
    const val = this.counter();
    return val * 100;
  });

  constructor() {
    this.effectRef = effect((onCleanup) => {
      /**
       * You need to create the dependency of effect before anything else
       * So att the beginning of the effect, create all your dependencies and then use them in the body of effect
       */
      const counter = this.counter();
      const timeout = setTimeout(() => {
        console.log(`counter value 1: ${counter}`);
      }, 1000);

      onCleanup(() => {
        console.log('Calling clean up function');
        clearTimeout(timeout);
      });
    });
  }

  public increment() {
    this.counter.update((val) => val + 1);
  }
  public decrement() {
    const currentCounter = this.counter();
    if (currentCounter > 0) {
      this.counter.update((val) => val - 1);
    }
  }

  public cleanup() {
    this.effectRef?.destroy();
  }
}
