/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity/album.entity';

@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
})
export class AlbumModule {}