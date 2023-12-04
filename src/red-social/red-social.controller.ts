/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RedSocialDto } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity/red-social.entity';
import { RedSocialService } from './red-social.service';

@Controller('redSocials')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController {
    constructor(private readonly redSocialService: RedSocialService) {}

  @Post()
  async create(@Body() redSocialDto: RedSocialDto) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.createRedSocial(redSocial);
  }
}

/* archivo: src/red-social/red-social.controller.ts */
