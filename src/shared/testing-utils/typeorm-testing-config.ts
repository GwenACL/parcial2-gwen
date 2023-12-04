/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from '../../album/album.entity/album.entity';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { RedSocialEntity } from '../../red-social/red-social.entity/red-social.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [AlbumEntity, FotoEntity, UsuarioEntity, RedSocialEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([AlbumEntity, FotoEntity, UsuarioEntity, RedSocialEntity]),
];