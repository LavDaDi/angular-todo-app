import {
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { MatCardModule, } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.html',
  styleUrls: ['./task-list-page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    TaskFormComponent,
  ],
  animations: [
    trigger('taskListAnimation', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class TaskListPageComponent implements OnInit {
  tasks: Task[] = [];
  showForm = false;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Загрузились задачи:', tasks);
        this.tasks = [...tasks];
        this.updateProgress();
      },
      error: (err) => {
        console.error('Ошибка загрузки задач:', err);
      },
    });
  }

  updateProgress() {
    const total = this.tasks.length;
    const done = this.tasks.filter((t) => t.status === 'done').length;
    return total > 0 ? (done / total) * 100 : 0;
  }

  openTaskForm() {
    this.showForm = true;
  }

  viewTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        console.log('Задача удалена, обновляем список');
        this.loadTasks();
      },
      error: (err) => {
        console.error('Ошибка удаления задачи:', err);
      },
    });
  }

  updateStatus(id: number, status: 'pending' | 'done') {
    const newStatus = status === 'pending' ? 'done' : 'pending';
    this.taskService.updateStatus(id, newStatus).subscribe({
      next: () => {
        console.log('Статус обновлен, обновляем список');
        this.loadTasks();
      },
      error: (err) => {
        console.error('Ошибка обновления статуса:', err);
      },
    });
  }

  onTaskAdded(task: Task) { // Добавляем параметр task
    this.showForm = false;
    this.loadTasks(); // Обновляем список после добавления
  }

  get completedPercentage(): number {
    return this.updateProgress();
  }
}