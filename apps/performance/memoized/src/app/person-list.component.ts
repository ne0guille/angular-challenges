import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Person } from './person.model';
import { FiboPipe } from './fibo.pipe';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    FiboPipe,
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  template: `
    <h1 class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>

    <mat-form-field class="w-4/5">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>

    <mat-list class="flex w-full">
      <mat-list-item *ngFor="let person of persons">
        <div MatListItemLine class="flex justify-between">
          <h3>{{ person.name }}</h3>
          <mat-chip> {{ person.fib | fibo }} </mat-chip>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];
  @Input() title = '';
  @Output() addPerson = new EventEmitter<string>();

  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addPerson.emit(this.label);
      this.label = '';
    }
  }
}
