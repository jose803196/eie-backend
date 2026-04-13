import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async findLatest() {
    const eventos = await this.eventoRepository.find({
      order: {
        eventDate: 'ASC',
      },
      // where: { eventDate: MoreThan(new Date()) }, // ¡Mejora futura para mostrar solo eventos futuros!
      take: 3,
    });
    return this.transformEventos(eventos);
  }

  async findAll() {
    const eventos = await this.eventoRepository.find({
      order: {
        eventDate: 'ASC',
      },
    });
    return this.transformEventos(eventos);
  }

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    console.log("Fecha recibida del DTO:", createEventoDto.eventDate);
    // Convertimos el string a objeto Date manualmente para validar
    const fecha = new Date(createEventoDto.eventDate);

    // Si la fecha es inválida, lanzamos un error claro antes de tocar la DB
    if (isNaN(fecha.getTime())) {
        console.error("Error: La fecha no se pudo convertir a objeto Date.");
        throw new Error('El formato de fecha proporcionado es inválido.');
    }

    const nuevoEvento = this.eventoRepository.create({
      title: createEventoDto.title,
      content: createEventoDto.content,
      eventDate: new Date(createEventoDto.eventDate).toISOString() // Asegura formato ISO
    });
    
    return this.eventoRepository.save(nuevoEvento);
}

  private transformEventos(eventos: Evento[]) {
    return eventos.map((evento) => {
      const fecha = new Date(evento.eventDate);
      return {
        id: evento.id,
        title: evento.title,
        content: evento.content,
        date: fecha.getDate(),
        day: fecha.toLocaleDateString('es-ES', { weekday: 'long' }),
        month: fecha.toLocaleDateString('es-ES', { month: 'long' }),
        hour: fecha.toLocaleTimeString('es-ES', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      };
    });
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOneBy({ id });

    if (!evento) {
      throw new NotFoundException(
        `El evento con el ID #${id} no fue encontrado.`,
      );
    }

    return evento;
  }
}
