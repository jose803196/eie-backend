// En src/auth/jwt-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      // 1. Extraemos el token de la cabecera (header) de la petición
      const token = this.extractTokenFromHeader(request);
      
      if (!token) {
        throw new UnauthorizedException('No se proporcionó un token de autenticación');
      }
      try {
        // 2. Verificamos que el token sea válido (no haya caducado y la firma sea correcta)
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET || 'MI_PALABRA_SECRETA_MUY_LARGA', // DEBE ser la misma clave secreta que usaste en auth.module.ts
        });
        
        // 3. Si es válido, guardamos la información del usuario (el payload) en la petición
        // para que nuestros controladores puedan saber QUIÉN está haciendo la petición.
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException('Token inválido o expirado');
      }
      return true; // ¡La puerta se abre!
    }
  
    // Función auxiliar para leer la cabecera "Authorization: Bearer <token>"
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }