import { Injectable } from '@angular/core';
import {HttpClient} from '../http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksUrl = 'tasks';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(page: number = 1): Observable<IPaginatedResults> {
    return this.httpClient.get<IPaginatedResults>(`${this.tasksUrl}?current_page=${page}`);
  }

  get(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.tasksUrl}/${id}`);
  }

  create(data: any): Observable<CreatedTask> {
    return this.httpClient.post<CreatedTask>(this.tasksUrl, data);
  }

  update(id: number, data: any): Observable<Task> {
    return this.httpClient.put<Task>(`${this.tasksUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.tasksUrl}/${id}`);
  }
}

export interface IPaginatedResults {
  data: Task[]
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  date: string;
  location?: string;
  details?: string;
  user_id?: number;
}

export interface CreatedTask {
  id: number;
  url: string;
}
