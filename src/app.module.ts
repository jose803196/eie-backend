import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticiasModule } from './noticias/noticias.module';
import { EventosModule } from './eventos/eventos.module';
import { PersonasModule } from './personas/personas.module';

// --- NOTA: Es buena práctica no importar las entidades aquí, sino en sus módulos ---

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        // Esta parte de SSL es OBLIGATORIA para conectar a Render desde fuera
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true, // Esto creará las tablas automáticamente en Postgres
      }),
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
