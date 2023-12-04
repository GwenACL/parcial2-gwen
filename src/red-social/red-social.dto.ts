/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class RedSocialDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;

 @IsString()
 @IsNotEmpty()
 readonly slogan: string;
}
/* archivo: src/red-social/red-social.dto.ts */