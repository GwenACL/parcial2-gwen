/* eslint-disable prettier/prettier */
/* archivo: src/usuario/usuario.entity.ts */
import { RedSocialEntity } from '../../red-social/red-social.entity/red-social.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';

@Entity()
export class UsuarioEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;
   @Column()
   telefono: string;

   @ManyToOne(() => RedSocialEntity, red => red.usuarios)
    red: RedSocialEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];

}


/* archivo: src/usuario/usuario.entity.ts */
