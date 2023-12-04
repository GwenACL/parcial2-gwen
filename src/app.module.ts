/* eslint-disable prettier/prettier */
import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { AlbumEntity } from './album/album.entity/album.entity';
import { FotoModule } from './foto/foto.module';
import { FotoEntity } from './foto/foto.entity/foto.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { RedSocialModule } from './red-social/red-social.module';
import { RedSocialEntity } from './red-social/red-social.entity/red-social.entity';

@Module({
  imports: [AlbumModule, FotoModule, UsuarioModule, RedSocialModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial',
      entities: [AlbumEntity, FotoEntity, UsuarioEntity, RedSocialEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      //logging: true
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
