import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, AsyncPipe],
  template: `
    <ng-container *ngIf="topics$ | async; let topics">
      <button [disabled]="topics.length === 0" (click)="openTopicModal(topics)">
        {{ 'Open Topic' }}
      </button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  private _topics = new BehaviorSubject<TopicType[]>([]);
  topics$ = this._topics.asObservable();

  ngOnInit(): void {
    this.topicService
      .fakeGetHttpTopic()
      .pipe(take(1))
      .subscribe((topics) => this._topics.next(topics));
  }

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, { data: { topics } });
  }
}
