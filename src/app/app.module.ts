import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: 'tasks', component: TaskListPageComponent },
  { path: 'tasks/:id', component: TaskDetailPageComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    // Импортируем standalone компоненты
    AppComponent,
    TaskListPageComponent,
    TaskDetailPageComponent,
  ],
  bootstrap: [AppComponent], // Указываем AppComponent как точку входа
})
export class AppModule {}