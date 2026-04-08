import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// @Controller('tasks') → todas las rutas de esta clase empiezan con /tasks
@Controller('tasks')
export class TasksController {
  // NestJS inyecta automáticamente el TasksService aquí (DI).
  // No hacemos `new TasksService()` — NestJS lo maneja por nosotros.
  constructor(private readonly tasksService: TasksService) {}

  // POST /tasks — crear una tarea
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  // GET /tasks — obtener todas las tareas
  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  // GET /tasks/:id — obtener una tarea por ID
  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  // PATCH /tasks/:id — actualizar una tarea
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.update(id, updateTaskDto);
  }

  // DELETE /tasks/:id — eliminar una tarea
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }
}
