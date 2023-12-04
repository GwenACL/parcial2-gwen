/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity/red-social.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedSocialService } from './red-social.service';

import { faker } from '@faker-js/faker';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redSocialList: RedSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(getRepositoryToken(RedSocialEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    redSocialList = [];
    for (let i = 0; i < 5; i++) {
      const red: RedSocialEntity = await repository.save({
        id: faker.string.uuid(),
        nombre: faker.company.name(),
        slogan: faker.company.catchPhrase(),
        usuarios: [],
      });
  
      redSocialList.push(red);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new red', async () => {
    const red: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      slogan: faker.company.catchPhrase(),
      usuarios: [],
    }

    const newRed: RedSocialEntity = await service.createRedSocial(red);
    expect(newRed).not.toBeNull();

    const storedRed: RedSocialEntity = await repository.findOne({where: {id: newRed.id}, relations: ['usuarios']})
    expect(storedRed).not.toBeNull();
    expect(storedRed.nombre).toEqual(newRed.nombre)
    expect(storedRed.id).toEqual(newRed.id)
    expect(storedRed.slogan).toEqual(newRed.slogan)
    expect(storedRed.usuarios).toEqual(newRed.usuarios)
  });

  it('create with empty slogan should return correct error', async () => {
    const red: RedSocialEntity = {
      id: faker.string.uuid(),
      nombre: faker.company.name(),
      slogan: "",
      usuarios: [],
    }

    await expect(() => service.createRedSocial(red)).rejects.toHaveProperty("message", "Red slogan shouldn't be empty")
  });
});