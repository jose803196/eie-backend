import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ type: 'timestamp' })
  eventDate!: Date;
}
