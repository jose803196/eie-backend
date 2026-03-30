import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticiasModule } from './noticias/noticias.module';
import { EventosModule } from './eventos/eventos.module';
import { PersonasModule } from './personas/personas.module';

// --- NOTA: Es buena práctica no importar las entidades aquí, sino en sus módulos ---

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'escuela.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),

    NoticiasModule,
    EventosModule,
    PersonasModule,
    // (Cuando crees PersonasModule, lo añadirás aquí)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
