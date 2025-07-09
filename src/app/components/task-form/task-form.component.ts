import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() closeForm = new EventEmitter<void>();
  newTask: Omit<Task, 'id'> = { title: '', description: '', status: 'pending' }; // Убрали status из Omit и добавили по умолчанию

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.newTask.title.trim()) {
      this.taskService.addTask(this.newTask).subscribe(newTask => {
        this.taskAdded.emit(newTask);
        this.newTask = { title: '', description: '', status: 'pending' }; // Сброс формы
        this.closeForm.emit();
      });
    }
  }
}