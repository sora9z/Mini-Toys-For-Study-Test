import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entity/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    return await this.directRepository.save(createDirectorDto);
  }

  async findAll() {
    return await this.directRepository.find();
  }

  async findOne(id: number) {
    return await this.directRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID의 Director 입니다.');
    }
    await this.directRepository.update({ id }, updateDirectorDto);

    const newDirector = await this.directRepository.findOne({
      where: { id },
    });
    return newDirector;
  }

  async remove(id: number) {
    const director = await this.directRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID입니다.');
    }
    await this.directRepository.delete(id);
    return id;
  }
}
