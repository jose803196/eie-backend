import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { CategoriaPersona } from './enums/categoria-persona.enum';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>,
  ) {}

  // CREATE (POST)
  create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const persona = this.personasRepository.create(createPersonaDto);
    return this.personasRepository.save(persona);
  }

  // READ (GET con filtros)
  findAll(
    categoria?: CategoriaPersona,
    search?: string,
    sort?: 'ASC' | 'DESC',
  ): Promise<Persona[]> {
    const options: FindManyOptions<Persona> = { order: { nombre: sort } };
    const where: FindOptionsWhere<Persona> = {};

    if (categoria) where.categoria = categoria;
    if (search) where.nombre = Like(`%${search}%`);

    options.where = where;
    return this.personasRepository.find(options);
  }

  // READ (GET por ID)
  async findOne(id: number): Promise<Persona> {
    const persona = await this.personasRepository.findOneBy({ id });
    if (!persona)
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    return persona;
  }

  // UPDATE (PATCH por ID)
  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.personasRepository.preload({
      id,
      ...updatePersonaDto,
    });
    if (!persona)
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    return this.personasRepository.save(persona);
  }

  // DELETE (DELETE por ID)
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.personasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    }
    return { message: `Persona con ID #${id} eliminada.` };
  }
}
