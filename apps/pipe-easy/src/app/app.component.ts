import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputePipe } from './compute.pipe';
import { randText } from '@ngneat/falso';

@Component({
  standalone: true,
  imports: [NgFor, ComputePipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | compute : index }}
    </div>
    <button (click)="change()">Change</button>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  change() {
    this.persons[0] = randText();
  }
}
