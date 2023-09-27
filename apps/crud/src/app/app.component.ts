import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';
import { Observable, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <ng-container *ngIf="(isLoading$ | async) === false; else loading">
      <div *ngFor="let todo of todos$ | async">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo.id)">Delete</button>
      </div>
    </ng-container>
    <ng-template #loading>
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private todoService: TodoService,
    private loadingService: LoadingService
  ) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit(): void {
    this.todoService.getTodos();
    this.isLoading$ = this.loadingService.isLoading$.pipe(tap(console.log));
  }

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  delete(id: number) {
    this.todoService.delete(id);
  }
}
