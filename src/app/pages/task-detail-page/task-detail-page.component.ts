import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatChipsModule]
})
export class TaskDetailPageComponent implements OnInit {
  task?: Task;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe((task) => {
      if (!task) {
        this.router.navigateByUrl('/tasks');
      }
      this.task = task;
    });
  }

  deleteTask() {
    if (!this.task) return;
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.router.navigateByUrl('/tasks');
    });
  }


  toggleStatus() {
    if (!this.task) return;
    const newStatus = this.task.status === 'pending' ? 'done' : 'pending';
    this.taskService.updateStatus(this.task.id, newStatus).subscribe(() => {
      this.task!.status = newStatus;
    });
  }

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  updateTask() {
    if (!this.task) return;
    this.taskService.updateTask(this.task.id, {
      title: this.task.title,
      description: this.task.description
    }).subscribe((updatedTask) => {
      this.task = updatedTask;
      this.editMode = false;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
