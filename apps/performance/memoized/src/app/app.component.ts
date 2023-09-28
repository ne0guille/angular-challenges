import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { generateList } from './generateList';
import { PersonListComponent } from './person-list.component';

@Component({
  standalone: true,
  imports: [PersonListComponent, NgIf],
  selector: 'app-root',
  template: `
    <p>Performance is key!!</p>
    <button
      (click)="loadList = true"
      class="border border-black p-2 rounded-md">
      Load List
    </button>

    <app-person-list
      *ngIf="loadList"
      class="max-w-2xl"
      [persons]="persons"
      title="Persons"
      (addPerson)="onAddPerson($event)" />
  `,
})
export class AppComponent {
  persons = generateList();
  loadList = false;

  onAddPerson(name: string) {
    this.persons = [
      {
        name,
        fib: Math.floor(Math.random() * 30) + 25,
      },
      ...this.persons,
    ];
  }
}
