import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: any[] = [];
  newTitle = '';
  newDescription = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadTasks()
  }

  loadTasks() {
    this.taskService.findAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/login']),
    });
  }

  create() {
    this.taskService.create(this.newTitle, this.newDescription).subscribe(() => {
      this.newTitle = '';
      this.newDescription = '';
      this.loadTasks();
    });
  }

  updateStatus(id: string, status: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.status = status;
    this.taskService.update(id, status).subscribe();
  }
 
  remove(id: string) {
    this.taskService.remove(id).subscribe(() => this.loadTasks());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
