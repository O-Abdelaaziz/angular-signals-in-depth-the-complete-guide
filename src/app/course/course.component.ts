import { Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { Router } from 'express';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit{
  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

  route=inject(ActivatedRoute);

  ngOnInit(): void {
    const course = this.route.snapshot.data['course'];
    if (course) {
      this.course.set(course);
    }
    // const courseId = this.route.snapshot.paramMap.get('courseId');
    // if (courseId) {
    //    this.course.set(courseId);
    // }
  }
}
