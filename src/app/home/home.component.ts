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
  public values = signal<number[]>([0]);

  /**
   * wrong way to append new value using signals
   */
  wrongWayToAppendNewValue() {
    const values = this.values();
    const lastItem = values[values.length - 1];
    values.push(lastItem + 1);
  }

  /**
   * right way to append new value using signals
   */
  rightWayToAppendNewValue() {
    this.values.update(values=>([
      ...values,
      values[values.length - 1]+1
    ]))
  }
}
