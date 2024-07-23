import { Component, effect, ElementRef, inject, input, output, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  public courses = input.required<Course[]>();
  public updatedCourse = output<Course>();
  public deletedCourse = output<string>();

  private dialog = inject(MatDialog);
  public courseCards = viewChildren<ElementRef>('courseCard');


  constructor(){
    effect(() => {
      console.log('courses cards', this.courseCards());
    })
  }
  public async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Update Existing Course ' + course.title,
      course: course,
    });

    if (!newCourse) {
      return;
    }
    this.updatedCourse.emit(newCourse);
  }

  public onCourseDeleted(course: Course) {
    this.deletedCourse.emit(course.id);
  }
}
