import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@Component({
  selector: 'lessons',
  standalone: true,
  imports: [LessonDetailComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
  mode = signal<'master' | 'detail'>('master');
  lessons = signal<Lesson[] | []>([]);
  selectedLesson = signal<Lesson | null>(null);

  lessonsService = inject(LessonsService);
  searchInput = viewChild.required('search', { read: ElementRef });

  public async onSearch() {
    const searchText = this.searchInput()?.nativeElement.value;
    console.log(searchText);

    // await this.lessonsService
    //   .loadAllLessons({ query: searchText })
    //   .then((lessons) => {
    //     this.lessons.set(lessons);
    //   });
    const result = await this.lessonsService.loadAllLessons({
      query: searchText,
    });
    this.lessons.set(result);
  }

  public onLessonSelected(lesson: Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  public onLessonUpdated(incomingLesson: Lesson) {
    this.lessons.update((lessons) =>
      lessons.map((lesson) =>
        lesson.id === incomingLesson.id ? incomingLesson : lesson
      )
    );
  }

  public onCancel() {
    this.mode.set('master');
  }
}
