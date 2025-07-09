import { Routes } from '@angular/router';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListPageComponent },
  { path: 'tasks/:id', component: TaskDetailPageComponent }
];
