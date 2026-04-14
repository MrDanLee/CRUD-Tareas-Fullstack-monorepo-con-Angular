import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TasksService {
  private tasks: Task[] = []

  create(dto: CreateTaskDto): Task {
    const task = { id: uuid(), ...dto, status: TaskStatus.OPEN };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task [] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find(t => t.id === id) 
    if (!task) {
      throw new NotFoundException(`Task "${id}" no encontrada`) 
    }
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task{
    const task = this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  remove(id: string): void {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter(t =>  t.id !== id);
  }
}
