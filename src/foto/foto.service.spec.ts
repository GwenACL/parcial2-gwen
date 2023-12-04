/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity/foto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoService } from './foto.service';

import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let FotoList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    FotoList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        id: faker.string.uuid(),
        ISO: 140,
        velObturacion: 6,
        apertura: 6,
        fecha: "28-11-2002",
        usuario: null,
        album: null,
      });
  
      FotoList.push(foto);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all fotos', async () => {
    const fotos: FotoEntity[] = await service.findAllFotos();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(FotoList.length);
  });

  it('findFotoById should return a foto by id', async () => {
    const storedFoto: FotoEntity = FotoList[0];
    const Foto: FotoEntity = await service.findFotoById(storedFoto.id);
    expect(Foto).not.toBeNull();
    expect(Foto.id).toEqual(storedFoto.id)
    expect(Foto.apertura).toEqual(storedFoto.apertura)
    expect(Foto.ISO).toEqual(storedFoto.ISO)
    expect(Foto.velObturacion).toEqual(storedFoto.velObturacion)
    expect(Foto.fecha).toEqual(storedFoto.fecha)
    expect(Foto.usuario).toEqual(storedFoto.usuario)
    expect(Foto.album).toEqual(storedFoto.album)
  });

  it('findFotoById should throw an exception for an invalid Foto', async () => {
    await expect(() => service.findFotoById("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });

  it('create should return a new Foto', async () => {
    const Foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: 130,
      velObturacion: 6,
      apertura: 6,
      fecha: "28-11-2002",
      usuario: null,
      album: null,
    }

    const newFoto: FotoEntity = await service.createFoto(Foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({where: {id: newFoto.id}, relations: ['usuario','album']})
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.id).toEqual(newFoto.id)
    expect(storedFoto.apertura).toEqual(newFoto.apertura)
    expect(storedFoto.ISO).toEqual(newFoto.ISO)
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion)
    expect(storedFoto.fecha).toEqual(newFoto.fecha)
    expect(storedFoto.usuario).toEqual(newFoto.usuario)
    expect(storedFoto.album).toEqual(newFoto.album)
  });

  it('create with invalid ISO size should return correct error', async () => {
    const Foto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: 24,
      velObturacion: 6,
      apertura: 6,
      fecha: "28-11-2002",
      usuario: null,
      album: null,
    }

    await expect(() => service.createFoto(Foto)).rejects.toHaveProperty("message","ISO size should be between 100 and 6400")
  });

  it('delete should remove a Foto', async () => {
    const Foto: FotoEntity = FotoList[0];
    await service.deleteFoto(Foto.id);
  
    const deletedFoto: FotoEntity = await repository.findOne({ where: { id: Foto.id } })
    expect(deletedFoto).toBeNull();
  });

  it('delete should throw an exception for an invalid Foto', async () => {
    const Foto: FotoEntity = FotoList[0];
    await service.deleteFoto(Foto.id);
    await expect(() => service.deleteFoto("0")).rejects.toHaveProperty("message", "The Foto with the given id was not found")
  });
 
});
