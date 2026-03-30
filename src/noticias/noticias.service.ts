import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from './entities/noticia.entity';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private noticiasRepository: Repository<Noticia>,
  ) {}

  findAll() {
    return this.noticiasRepository.find({
      order: { id: 'DESC' },
    });
  }

  // Lógica para la página principal
  findLatest() {
    return this.noticiasRepository.find({
      order: { id: 'DESC' },
      take: 3,
    });
  }

  create(noticia: Noticia) {
    return this.noticiasRepository.save(noticia);
  }

  async findOne(id: number): Promise<Noticia> {
    const noticia = await this.noticiasRepository.findOneBy({ id });

    if (!noticia) {
      throw new NotFoundException(
        `La noticia con el ID #${id} no fue encontrada.`,
      );
    }

    return noticia;
  }
}
