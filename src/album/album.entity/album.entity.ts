/* eslint-disable prettier/prettier */
/* archivo: src/album/album.entity.ts */
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   fechaInicio: string;
   @Column()
   fechaFin: string;
   @Column()
   titulo: string;

    @OneToMany(() => FotoEntity, foto => foto.album)
    fotos: FotoEntity[];

}


/* archivo: src/album/album.entity.ts */

