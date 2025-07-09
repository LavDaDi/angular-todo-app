import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Задача 1', description: 'Описание 1', status: 'pending' },
    { id: 2, title: 'Задача 2', description: 'Описание 2', status: 'done' },
  ];
  private tasksSubject = new BehaviorSubject<Task[]>([...this.tasks]);
  private nextId = 3;

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTask(id: number): Observable<Task | undefined> {
    const task = this.tasks.find(t => t.id === id);
    return of(task);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: this.nextId++,
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
    return of(newTask);
  }

  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
    return of();
  }

  updateStatus(id: number, status: 'pending' | 'done'): Observable<void> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      this.tasksSubject.next([...this.tasks]);
    }
    
    return of();
  }

  updateTask(id: number, data: Partial<Task>): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = data.title ?? task.title;
      task.description = data.description ?? task.description;
      this.tasksSubject.next([...this.tasks]);
      return of({ ...task });
    }
    return of(undefined as any);
  }
}
