import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <h1 cd-flash class="font-semibold text-center" [title]="title">
      {{ title | titlecase }}
    </h1>
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  imports: [
    CDFlashingDirective,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() title = '';
  @Output() addMember = new EventEmitter<string>();

  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addMember.emit(this.label);
      this.label = '';
    }
  }
}
