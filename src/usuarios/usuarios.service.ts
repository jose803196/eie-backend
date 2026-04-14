import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // 1. Modificamos el CREATE para encriptar la contraseña
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const saltRounds = 10;
    // Encriptamos la clave antes de guardarla
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, saltRounds);
    
    // Creamos el usuario reemplazando la clave de texto plano por el Hash
    const nuevoUsuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    
    return this.usuariosRepository.save(nuevoUsuario);
  }

  // 2. Creamos este NUEVO MÉTODO para que el Login pueda buscar al usuario
  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOneBy({ username });
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}