/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './red-social.entity/red-social.entity';

@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
})
export class RedSocialModule {}