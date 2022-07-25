import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mensaje } from './mensajes/entities/mensaje.entity';
import { MensajesController } from './mensajes/mensajes.controller';
import { MensajesService } from './mensajes/mensajes.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Mensaje],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Mensaje]) // Inyectar en todos los componentes de nuestro módulo la entidad mensaje
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
