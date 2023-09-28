import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-person-item',
  standalone: true,
  imports: [MatListModule, CDFlashingDirective],
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          {{ name }}
        </h3>
      </div>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonItemComponent {
  @Input({ required: true }) name!: string;
}
