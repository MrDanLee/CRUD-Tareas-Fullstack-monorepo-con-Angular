import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// @Injectable() le dice a NestJS: "este servicio puede ser inyectado
// en cualquier clase que lo pida". Esto es Dependency Injection (DI).
@Injectable()
export class TasksService {
  // Nuestro "almacén" en memoria — un simple array.
  // Cuando conectemos TypeORM, reemplazaremos esto por un Repository.
  private tasks: Task[] = [];

  // ---------- CREATE ----------
  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // ---------- READ (all) ----------
  findAll(): Task[] {
    return this.tasks;
  }

  // ---------- READ (one) ----------
  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      // NestJS convierte NotFoundException en una respuesta 404 automáticamente.
      throw new NotFoundException(`Task con id "${id}" no encontrada`);
    }

    return task;
  }

  // ---------- UPDATE ----------
  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id); // reutilizamos findOne (lanza 404 si no existe)

    // Object.assign copia solo las propiedades que vienen en el DTO
    Object.assign(task, updateTaskDto);

    return task;
  }

  // ---------- DELETE ----------
  remove(id: string): void {
    const task = this.findOne(id); // valida que exista
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
