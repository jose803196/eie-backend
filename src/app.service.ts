import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): string {
    return '¡Servidor de la EIE funcionando correctamente!';
  }
}
