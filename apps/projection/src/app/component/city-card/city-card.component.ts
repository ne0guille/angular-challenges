import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    class="bg-light-purple"
    (addItem)="onAddNewItem()">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template #row let-city>
      <app-list-item (delete)="onDelete(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  // @HostBinding('class.my-class') applyMyClass = true;

  cities$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
