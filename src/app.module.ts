import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumService } from './album/album.service';
import { UsuarioService } from './usuario/usuario.service';
import { RedSocialService } from './red-social/red-social.service';
import { FotoService } from './foto/foto.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AlbumService, UsuarioService, RedSocialService, FotoService],
})
export class AppModule {}
