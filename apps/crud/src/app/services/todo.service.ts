import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { randText } from '@ngneat/falso';

export type Todo = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosBs = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosBs.asObservable();
  baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(this.baseUrl).subscribe((todos) => {
      this.todosBs.next(todos);
    });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `${this.baseUrl}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: Todo) => {
        this.todosBs.next(
          this.todosBs.value.map((t) =>
            t.id === todoUpdated.id ? todoUpdated : t
          )
        );
      });
  }

  delete(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      this.todosBs.next(this.todosBs.value.filter((t) => t.id !== id));
    });
  }
}
