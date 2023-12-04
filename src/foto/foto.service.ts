/* eslint-disable prettier/prettier */
/* archivo: src/foto/foto.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { AlbumEntity } from '../album/album.entity/album.entity';

@Injectable()
export class FotoService {
   constructor(
       @InjectRepository(FotoEntity)
       @InjectRepository(AlbumEntity)
       private readonly fotoRepository: Repository<FotoEntity>,
       private readonly albumRepository: Repository<AlbumEntity>
   ){}

   async findAllFotos(): Promise<FotoEntity[]> {
       return await this.fotoRepository.find({ relations: ["usuario", "album"] });
   }

   async findFotoById(id: string): Promise<FotoEntity> {
       const foto: FotoEntity = await this.fotoRepository.findOne({where: {id}, relations: ["usuario", "album"] } );
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
  
       return foto;
   }
  
   async createFoto(foto: FotoEntity): Promise<FotoEntity> {
       if (foto.ISO < 100 || foto.ISO > 6400)
         throw new BusinessLogicException("ISO size should be between 100 and 6400", BusinessError.INCORRECT_SIZE);
       if (foto.velObturacion < 2 || foto.velObturacion > 250)
         throw new BusinessLogicException("VelObturacion size should be between 2 and 250", BusinessError.INCORRECT_SIZE);
       if (foto.apertura < 1 || foto.velObturacion > 32)
         throw new BusinessLogicException("apertura size should be between 1 and 32", BusinessError.INCORRECT_SIZE);
       return await this.fotoRepository.save(foto);
   }

   async deleteFoto(id: string) {
       const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}});
       if (!foto)
         throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
       
       await this.fotoRepository.remove(foto);
       const idAlbum = foto.album.id;
       const album: AlbumEntity = await this.albumRepository.findOne({where:{id: idAlbum}});
       if (album.fotos.length == 1)
         await this.albumRepository.remove(album);
   }
}
/* archivo: src/foto/foto.service.ts */
