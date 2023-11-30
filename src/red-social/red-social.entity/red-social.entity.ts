/* eslint-disable prettier/prettier */
/* archivo: src/red-social/red-social.entity.ts */
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedSocialEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;
   @Column()
   slogan: string;

    @OneToMany(() => UsuarioEntity, usuario => usuario.red)
    usuarios: UsuarioEntity[];

}

/* archivo: src/red-social/red-social.entity.ts */
