/* eslint-disable prettier/prettier */
/* archivo: src/foto/foto.entity.ts */
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../album/album.entity/album.entity';

@Entity()
export class FotoEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   ISO: number;
   @Column()
   velObturacion: number;
   @Column()
   apertura: number;
   @Column()
   fecha: string;

   @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
   usuario: UsuarioEntity;

   @ManyToOne(() => AlbumEntity, album => album.fotos)
   album: AlbumEntity;

}


/* archivo: src/foto/foto.entity.ts */