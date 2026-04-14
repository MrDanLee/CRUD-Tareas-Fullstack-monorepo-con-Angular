import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import type { Task } from "./task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() 
  findAll() {
    return this.tasksService.findAll();
  }
  
  @Post() 
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

