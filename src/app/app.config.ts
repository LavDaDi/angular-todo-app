/*import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'tasks', component: TaskListPageComponent },
      { path: 'tasks/:id', component: TaskDetailPageComponent },
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    ]),
    importProvidersFrom(
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatSnackBarModule
    ),
  ],
};
*/