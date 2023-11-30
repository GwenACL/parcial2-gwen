/* eslint-disable prettier/prettier */
/* archivo: src/album/album.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';

@Injectable()
export class AlbumService {
   constructor(
       @InjectRepository(AlbumEntity)
       @InjectRepository(FotoEntity)
       private readonly albumRepository: Repository<AlbumEntity>,
       private readonly fotoRepository: Repository<FotoEntity>
   ){}

   async findAlbumById(id: string): Promise<AlbumEntity> {
       const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["fotos"] } );
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
  
       return album;
   }
  
   async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.titulo == '')
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.EMPTY_TITLE);
        return await this.albumRepository.save(album);
   }

   async addPhotoToAlbum(albumId: string, fotoId: string): Promise<AlbumEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
    if (!foto)
      throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
    const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos"]})
    if (!album)
      throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
    if (foto.fecha < album.fechaInicio || foto.fecha > album.fechaFin)
      throw new BusinessLogicException("The photo was not taken during the dates of the album", BusinessError.INCORRECT_DATE);
    album.fotos = [...album.fotos, foto];
    return await this.albumRepository.save(album);
  }

   async deleteAlbum(id: string) {
       const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
       if (!album)
         throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
       if (!album.fotos.length)
         throw new BusinessLogicException("The album can't be deleted while it contains photos", BusinessError.NOT_EMPTY);
       await this.albumRepository.remove(album);
   }
}
/* archivo: src/album/album.service.ts */
