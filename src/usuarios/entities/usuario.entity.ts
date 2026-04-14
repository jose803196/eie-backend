import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true }) // El usuario no se puede repetir
  username!: string;

  @Column()
  password!: string; // Aquí guardaremos la clave encriptada
}