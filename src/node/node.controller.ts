import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateNodeDto, UpdateNodeDto } from './dto/node.dto';
import { NodeEntity } from './node.entity';
import { NodeService } from './node.service';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}
  @Get()
  getNodes(): Promise<NodeEntity[]> {
    return this.nodeService.findAll();
  }

  @Post()
  createNode(@Body() body: CreateNodeDto): Promise<NodeEntity> {
    return this.nodeService.create(body);
  }

  @Patch('/:nodeId')
  async updateNode(
    @Param('nodeId', ParseIntPipe) nodeId: number,
    @Body() body: UpdateNodeDto,
  ): Promise<NodeEntity> {
    return this.nodeService.update(body, nodeId);
  }

  @Delete('/:nodeId')
  deleteNode(
    @Param('nodeId', ParseIntPipe) nodeId: number,
  ): Promise<NodeEntity[]> {
    return this.nodeService.delete(nodeId);
  }
}
