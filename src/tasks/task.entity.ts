import { TaskStatus } from './task-status.enum';

// Esta interfaz describe la FORMA de una tarea.
// Por ahora es una interfaz simple; cuando conectemos TypeORM
// la convertiremos en una clase con decoradores.
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
