/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('Usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll() {
    return await this.usuarioService.findAllUsuarios();
  }
  @Get(':usuarioId')
  async findOne(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.findUsuarioById(usuarioId);
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.createUsuario(usuario);
  }
}

/* archivo: src/usuario/usuario.controller.ts */
