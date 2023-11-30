/* eslint-disable prettier/prettier */
/* archivo: src/red-social/red-social.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity/red-social.entity';

@Injectable()
export class RedSocialService {
   constructor(
       @InjectRepository(RedSocialEntity)
       private readonly redSocialRepository: Repository<RedSocialEntity>
   ){}

  
   async createRedSocial(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
       if (redSocial.slogan.length == 0)
         throw new BusinessLogicException("Red slogan shouldn't be empty",BusinessError.EMPTY_SLOGAN);
       if (redSocial.slogan.length < 20)
         throw new BusinessLogicException("Red slogan should be at least 20 caracters long",BusinessError.TOO_SHORT);
       return await this.redSocialRepository.save(redSocial);
   }
}
/* archivo: src/red-social/red-social.service.ts */
