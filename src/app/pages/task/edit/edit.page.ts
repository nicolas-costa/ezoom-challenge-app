import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskService, Task} from "../../../services/tasks/";
import { Location } from '@angular/common';
import {ToastService} from "../../../services/ui/toast/toast.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  task: Task = {date: "", id: 0, title: ""};
  requesting: boolean = false

  constructor(private route: ActivatedRoute, private taskService: TaskService,
              private location: Location, private toastService: ToastService) { }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.task.id = +params['id'];
    });
  }

  ionViewDidEnter() {
    this.taskService.get(this.task.id).subscribe(
      (task: Task) =>  this.task = task,
      () => this.toastService.present('Houve um erro ao obter a tarefa.'));
  }

  send() {
    this.requesting = true;
    this.taskService.update(this.task.id, this.task).subscribe(() => {
        this.requesting = false;
        this.toastService.present('Tarefa atualizada com sucesso.');
        this.location.back();
      }, () => {
        this.requesting = false;
        this.toastService.present('Houve um erro ao atualizar a tarefa.')
      }
    )
  }

  isDisabled() {
    return this.requesting || !this.task.title.length || !this.task.date.length
  }
}
