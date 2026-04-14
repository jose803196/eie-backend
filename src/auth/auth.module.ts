import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuariosModule, // Necesitamos buscar usuarios
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'MI_PALABRA_SECRETA_MUY_LARGA', // La firma de tu token
      signOptions: { expiresIn: '12h' }, // La tarjeta magnética caduca en 12 horas
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}