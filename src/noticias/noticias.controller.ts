import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { Noticia } from './entities/noticia.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Delete } from '@nestjs/common';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() noticia: Noticia) {
    return this.noticiasService.create(noticia);
  }

  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // 🔒 Solo con Token
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.remove(id);
}
}
