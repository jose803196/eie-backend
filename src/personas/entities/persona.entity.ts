import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CategoriaPersona } from '../enums/categoria-persona.enum';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  imagen: string;

  @Column({
    type: 'simple-enum',
    enum: CategoriaPersona,
    default: CategoriaPersona.PROFESORES,
  })
  categoria: CategoriaPersona;
}
