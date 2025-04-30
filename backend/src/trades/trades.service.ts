import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    userId: number,
  ): Promise<Activity> {
    const activity = this.activityRepository.create({
      ...createActivityDto,
      user: { id: userId },
    });
    return this.activityRepository.save(activity);
  }

  async findAll(userId: number): Promise<Activity[]> {
    return this.activityRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: number, userId: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!activity) {
      throw new Error('Activity not found');
    }
    return activity;
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivityDto,
    userId: number,
  ): Promise<Activity> {
    await this.activityRepository.update(
      { id, user: { id: userId } },
      updateActivityDto,
    );
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.activityRepository.delete({ id, user: { id: userId } });
  }
}
