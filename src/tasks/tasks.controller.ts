import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import type { Task } from "./task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Req } from "@nestjs/common";

@Controller('tasks')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() 
  findAll(@Query('status') status?: TaskStatus) {
    return this.tasksService.findAll(status);
  }
  
  @Post() 
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(dto, req.user);
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

