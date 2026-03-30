import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  content: string;

  @Column({ default: 'https://ejemplo.com/imagen.jpg' })
  image: string;
}
