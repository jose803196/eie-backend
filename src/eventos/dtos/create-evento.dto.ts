import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  @IsNotEmpty()
  eventDate: string;
}
