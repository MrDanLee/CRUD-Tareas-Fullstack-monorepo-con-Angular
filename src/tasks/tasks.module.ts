import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// @Module conecta las piezas:
// - controllers: quién recibe las peticiones HTTP
// - providers: quién tiene la lógica (services, repositories, etc.)
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
