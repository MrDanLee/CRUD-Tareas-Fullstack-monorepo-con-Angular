import { IsNotEmpty, IsString } from 'class-validator';

// Los decoradores de class-validator definen reglas.
// El ValidationPipe (que activaremos en main.ts) los ejecuta
// ANTES de que el request llegue al controller.
export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString()
  description: string;
}
