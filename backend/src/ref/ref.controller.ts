import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { RefService } from './ref.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('ref')
@Controller('ref')
export class RefController {
  constructor(private readonly refService: RefService) {}

  @Get('pools')
  @ApiOperation({ summary: 'Get all Ref Finance pools' })
  @ApiResponse({ status: 200, description: 'Returns all pools' })
  async getAllPools() {
    return await this.refService.getAllPools();
  }

  @Get('pools/:id')
  @ApiOperation({ summary: 'Get a specific pool by ID' })
  @ApiParam({ name: 'id', description: 'Pool ID (numeric)' })
  @ApiResponse({ status: 200, description: 'Returns the specified pool' })
  @ApiResponse({ status: 404, description: 'Pool not found' })
  async getPoolById(@Param('id', ParseIntPipe) id: number) {
    const pool = await this.refService.getPoolById(id);
    if (!pool) {
      throw new NotFoundException(`Pool with ID ${id} not found`);
    }
    return pool;
  }
}
