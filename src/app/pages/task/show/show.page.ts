import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { ToastService } from "../../../services/ui/toast/toast.service";
import { TaskService, Task } from "../../../services/tasks";

@Component({
  selector: 'app-create',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage {
  task: Task = {date: "", description: "", details: "", id: 0, location: "", title: "", user_id: 0}
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
}
