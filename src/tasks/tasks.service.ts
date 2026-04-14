import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto): Promise<Task> {
    const task = { ...dto, status: TaskStatus.OPEN };
    return this.tasksRepository.save(task);
  }

  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return this.tasksRepository.findBy({ status });
    }
    return this.tasksRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id }) 
    if (!task) {
      throw new NotFoundException(`Task "${id}" no encontrada`) 
    }
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task>{
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task)
  }
}
