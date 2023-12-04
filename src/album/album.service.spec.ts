/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumService } from './album.service';

import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    albumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        id: faker.string.uuid(),
        fechaInicio: "28-11-2001",
        fechaFin: "28-11-2018",
        titulo: faker.lorem.word(),
        fotos:[],
      });
  
      albumList.push(album);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a album by id', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findAlbumById(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.id).toEqual(storedAlbum.id)
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio)
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin)
    expect(album.titulo).toEqual(storedAlbum.titulo)
    expect(album.fotos).toEqual(storedAlbum.fotos)
  });

  it('findOne should throw an exception for an invalid album', async () => {
    await expect(() => service.findAlbumById("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      fechaInicio: "28-11-2001",
      fechaFin: "28-11-2018",
      titulo: faker.lorem.word(),
      fotos:[],
    }

    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}, relations: ['fotos']})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.id).toEqual(newAlbum.id)
    expect(storedAlbum.fechaInicio).toEqual(newAlbum.fechaInicio)
    expect(storedAlbum.fechaFin).toEqual(newAlbum.fechaFin)
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo)
    expect(storedAlbum.fotos).toEqual(newAlbum.fotos)
  });

  
  it('create with empty title should return correct error', async () => {
    const album: AlbumEntity = {
      id: faker.string.uuid(),
      fechaInicio: "28-11-2001",
      fechaFin: "28-11-2018",
      titulo: "",
      fotos:[],
    }

    await expect(() => service.createAlbum(album)).rejects.toHaveProperty("message", "The album should'nt have an empty title")
  });

 
  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.deleteAlbum(album.id);
  
    const deletedAlbum: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deletedAlbum).toBeNull();
  });

  it('delete should throw an exception for an invalid album', async () => {
    const album: AlbumEntity = albumList[0];
    await service.deleteAlbum(album.id);
    await expect(() => service.deleteAlbum("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });
 
});