import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { ToastService } from "../../../services/ui/toast/toast.service";
import { TaskService, Task } from "../../../services/tasks";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  task: Task = {date: "", description: "", details: "", id: 0, location: "", title: "", user_id: 0}
  requesting: boolean = false

  constructor(private route: ActivatedRoute, private taskService: TaskService,
              private location: Location, private toastService: ToastService) { }

  send() {
    this.requesting = true;

    this.task.date = this.task.date.split('T')[0]

    this.taskService.create(this.task).subscribe(() => {
        this.requesting = false;
        this.toastService.present('Tarefa criada com sucesso.');
        this.location.back();
      }, () => {
        this.requesting = false;
        this.toastService.present('Houve um erro ao criar a tarefa.')
      }
    )
  }

  isDisabled() {
    return this.requesting || !this.task.title.length || !this.task.date.length
  }
}
