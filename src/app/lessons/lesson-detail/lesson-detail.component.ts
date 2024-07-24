import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { ReactiveFormsModule } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();
  cancel = output();

  lessonService = inject(LessonsService);
  messagesService = inject(MessagesService);

  async onSave(description: string) {
    try {
      const lesson = this.lesson();
      if (lesson) {
        const updatedLesson = await this.lessonService.updateLesson(
          lesson?.id,
          {
            description,
          }
        );
        this.lessonUpdated.emit(updatedLesson);
        this.messagesService.showMessage('Lesson updated', 'success');
        this.onCancel();
      }
    } catch (error) {
      this.messagesService.showMessage(
        'An error occurred when saving: ' + error,
        'error'
      );
    }
  }
  onCancel() {
    this.cancel.emit();
  }
}
