import {Component, OnInit} from '@angular/core';
import {TaskService, Task, IPaginatedResults} from "../../services/tasks";
import {ToastService} from "../../services/ui/toast/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage implements OnInit {
  tasks: Task[] = [];
  infiniteScroll: boolean = false;
  currentPage: number = 1;

  constructor(private readonly taskService: TaskService, private readonly toastService: ToastService,
              private readonly router: Router) {}

  ngOnInit() {
    this.fetchTasks()
  }

  fetchTasks($event: any = null) {
    this.taskService.getAll().subscribe((data: IPaginatedResults) => {
      this.tasks = data.data;

      if (data.data.length) {
        this.infiniteScroll = true;
      }

      if($event) {
        $event.target.complete();
      }
    }, () => {
      this.tasks = [];
      this.toastService.present('Erro ao obter lista.')
    })
  }

  onIonInfinite($event: any) {
    this.taskService.getAll(this.currentPage + 1).subscribe((data: IPaginatedResults) => {

      if (!data.data.length) {
        this.infiniteScroll = false
      } else {
        this.tasks = [
          ...this.tasks,
          ...data.data
        ];

        this.currentPage += 1;
      }

      $event.target.complete()
    }, () => {
      this.tasks = [];
      this.toastService.present('Erro ao atualizar lista.')
    })
  }

  onEdit(taskId: number) {
    this.router.navigate(['/tasks/edit', taskId])
  }

  onDelete(taskId: number) {
    this.taskService.delete(taskId).subscribe(() => {
      this.fetchTasks();
    }, () => this.toastService.present('Erro ao excluir tarefa.'))
  }

  onCreate() {
    this.router.navigate(['tasks/create']);
  }

  onShow(taskId: number) {
    this.router.navigate(['tasks/show', taskId]);
  }
}
