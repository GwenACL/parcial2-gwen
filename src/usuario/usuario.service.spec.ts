/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioService } from './usuario.service';
import { RedSocialEntity } from '../red-social/red-social.entity/red-social.entity';

import { faker } from '@faker-js/faker';

describe('usuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];
  let redRepository: Repository<RedSocialEntity>;
  let red: RedSocialEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    redRepository = module.get<Repository<RedSocialEntity>>(getRepositoryToken(RedSocialEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    usuarioList = [];
    await redRepository.clear();
    const newRed: RedSocialEntity = await redRepository.save({
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      slogan: faker.company.catchPhrase(),
      usuarios: [],
    })
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.person.fullName(),
        telefono: "0123456789",
        red: newRed,
        fotos: [],
      });
  
      usuarioList.push(usuario);
      red = newRed;
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all usuarios', async () => {
    const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuarioList.length);
  });

  it('findOne should return a usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario: UsuarioEntity = await service.findUsuarioById(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(storedUsuario.nombre)
    expect(usuario.telefono).toEqual(storedUsuario.telefono)
    expect(usuario.red.id).toEqual(storedUsuario.red.id)
    expect(usuario.red.nombre).toEqual(storedUsuario.red.nombre)
    expect(usuario.red.slogan).toEqual(storedUsuario.red.slogan)
    expect(usuario.fotos).toEqual(storedUsuario.fotos)
  });

  it('findOne should throw an exception for an invalid usuario', async () => {
    await expect(() => service.findUsuarioById("0")).rejects.toHaveProperty("message", "The user with the given id was not found")
  });

  it('create should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.person.fullName(),
      telefono: "0123456789",
      red: red,
      fotos: [],
    }

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({where: {id: newUsuario.id}, relations: ['red','fotos']})
    const newRed: RedSocialEntity = await redRepository.findOne({where : {id: newUsuario.red.id}, relations: ['usuarios']})
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre)
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono)
    expect(storedUsuario.red.id).toEqual(newRed.id);
    expect(storedUsuario.red.nombre).toEqual(newRed.nombre);
    expect(storedUsuario.red.slogan).toEqual(newRed.slogan);
    expect(storedUsuario.fotos).toEqual(newUsuario.fotos)
  });

  it('create with invalid number should return correct error', async () => {
    const usuario: UsuarioEntity = {
      id: faker.string.uuid(),
      nombre: faker.person.fullName(),
      telefono: "012345678910",
      red: red,
      fotos: [],
    }

    await expect(() => service.createUsuario(usuario)).rejects.toHaveProperty("message", "The user's number should contain exactly 10 numbers")
  });
});
