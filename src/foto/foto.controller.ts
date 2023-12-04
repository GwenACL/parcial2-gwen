/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity/foto.entity';
import { FotoService } from './foto.service';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

  @Get()
  async findAll() {
    return await this.fotoService.findAllFotos();
  }
  @Get(':fotoId')
  async findOne(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findFotoById(fotoId);
  }

  @Post()
  async create(@Body() fotoDto: FotoDto) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.createFoto(foto);
  }

  @Delete(':fotoId')
  @HttpCode(204)
  async delete(@Param('fotoId') fotoId: string) {
    return await this.fotoService.deleteFoto(fotoId);
  }
}

/* archivo: src/foto/foto.controller.ts */
