import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    // 1. Buscamos si el usuario existe
    const user = await this.usuariosService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas'); // Error 401
    }

    console.log("Contraseña enviada por Swagger (pass):", pass);
    console.log("Contraseña en Base de Datos (user.password):", user.password);
    // 2. Comparamos la contraseña escrita con el Hash de la base de datos
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas'); // Error 401
    }

    // 3. Si todo está bien, creamos la tarjeta magnética (JWT Payload)
    const payload = { sub: user.id, username: user.username };
    
    // 4. Devolvemos el Token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}