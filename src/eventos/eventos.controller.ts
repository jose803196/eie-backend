import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { Param, ParseIntPipe } from '@nestjs/common';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  // Endpoint para la página de archivo: GET /eventos
  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  // Endpoint para crear eventos: POST /eventos
  @Post()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  // Endpoint para obtener un evento por ID: GET /eventos/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.findOne(id);
  }
}
