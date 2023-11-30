/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.entity.ts */
//import { ArtworkEntity } from '../../artwork/artwork.entity/artwork.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { ExhibitionEntity } from '../../exhibition/exhibition.entity/exhibition.entity';

@Entity()
export class RedSocialEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;
   @Column()
   slogan: string;

//    @OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
//    exhibitions: ExhibitionEntity[];

//    @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
//    artworks: ArtworkEntity[];

}


/* archivo: src/museum/museum.entity.ts */
