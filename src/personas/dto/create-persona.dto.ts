import { IsString, IsNotEmpty, IsEnum, IsUrl } from 'class-validator';
import { CategoriaPersona } from '../enums/categoria-persona.enum';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsUrl()
  @IsNotEmpty()
  imagen: string;

  @IsEnum(CategoriaPersona)
  @IsNotEmpty()
  categoria: CategoriaPersona;
}
