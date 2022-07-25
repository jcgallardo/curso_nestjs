import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(
        private mensajesService: MensajesService
    ){}

    @Get()
    getAll(@Res() response) {
        this.mensajesService.getAll()
            .then((mensajes) => {
                response.status(HttpStatus.OK).json(mensajes);
            })
            .catch((error) => {
                console.error(error);
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la obtención de mensajes'
                })
            });
    }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajesService.createMensaje(createMensajeDto)
            .then((mensaje) => {
                response.status(HttpStatus.OK).json(mensaje);
            })
            .catch((error) => {
                console.error(error);
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la creación del mensaje'
                })
            });
    }

    @Delete(':id')
    delete(@Param('id') idMensaje, @Res() response) {
        this.mensajesService.deleteMensaje(idMensaje)
            .then((res) => response.status(HttpStatus.OK).json(res))
            .catch((error) => {
                console.error(error);
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la eliminación del mensaje'
                })
            });
    }

    @Put(':id')
    put(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajesService.updateMensaje(idMensaje, updateMensajeDto)
            .then((mensaje) => {
                response.status(HttpStatus.OK).json(mensaje);
            })
            .catch((error) => {
                console.error(error);
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la modificación del mensaje'
                })
            });
    }
}
