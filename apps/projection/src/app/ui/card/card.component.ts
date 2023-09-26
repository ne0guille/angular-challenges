import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Output() addItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<number>();
  @ContentChild('row', { read: TemplateRef })
  rowTemplate: TemplateRef<any> | null = null;

  addNewItem() {
    this.addItem.emit();
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }
}
