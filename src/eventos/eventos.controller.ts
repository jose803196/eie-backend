import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { Param, ParseIntPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Delete } from '@nestjs/common';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get() // ✅ SIN GUARDIA (Público para que la web lo lea)
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id') // <--- ¿ESTA LÍNEA ESTÁ AHÍ?
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.findOne(id);
  }

  @Get('latest') // ✅ SIN GUARDIA (Público para el inicio)
  findLatest() {
    return this.eventosService.findLatest();
  }

  @UseGuards(JwtAuthGuard) // 🔒 CON GUARDIA (Protegido para la secretaria)
  @Post()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @UseGuards(JwtAuthGuard) // 🔒 CON GUARDIA (Protegido para la secretaria)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}
