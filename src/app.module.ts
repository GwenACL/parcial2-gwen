import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumService } from './album/album.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AlbumService],
})
export class AppModule {}
