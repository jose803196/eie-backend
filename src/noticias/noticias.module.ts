import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { Noticia } from './entities/noticia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia])], // Usa las herramientas para 'Noticia'
  controllers: [NoticiasController], // Contrata a este gerente
  providers: [NoticiasService], // Contrata a este especialista
})
export class NoticiasModule {}
