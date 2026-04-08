// Un enum nos permite definir los estados válidos de una tarea.
// NestJS no sabe qué es "válido" a menos que se lo digamos.
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
