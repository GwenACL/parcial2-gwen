/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class AlbumDto {

 @IsString()
 @IsNotEmpty()
 readonly fechaInicio: string;
 
 @IsString()
 @IsNotEmpty()
 readonly fechaFin: string;
 
 @IsString()
 @IsNotEmpty()
 readonly Titulo: string;
}
/* archivo: src/album.dto.ts */