/* eslint-disable prettier/prettier */
/* archivo: src/usuario/usuario.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {
   constructor(
       @InjectRepository(UsuarioEntity)
       private readonly usuarioRepository: Repository<UsuarioEntity>
   ){}

   async findAllUsuarios(): Promise<UsuarioEntity[]> {
       return await this.usuarioRepository.find({ relations: ["red", "fotos"] });
   }

   async findUsuarioById(id: string): Promise<UsuarioEntity> {
       const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ["red", "fotos"] } );
       if (!usuario)
         throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
  
       return usuario;
   }
  
   async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
       if (usuario.telefono.length != 10)
        throw new BusinessLogicException("The user's number should contain exactly 10 numbers",BusinessError.WRONG_SIZE);
       return await this.usuarioRepository.save(usuario);
   }
}
/* archivo: src/usuario/usuario.service.ts */
