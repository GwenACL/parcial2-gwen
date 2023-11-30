/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.entity.ts */
//import { ArtworkEntity } from '../../artwork/artwork.entity/artwork.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { ExhibitionEntity } from '../../exhibition/exhibition.entity/exhibition.entity';

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

//    @OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
//    exhibitions: ExhibitionEntity[];

//    @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
//    artworks: ArtworkEntity[];

}


/* archivo: src/museum/museum.entity.ts */