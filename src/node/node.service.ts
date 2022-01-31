import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNodeDto, UpdateNodeDto } from './dto/node.dto';
import { NodeEntity } from './node.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(NodeEntity)
    private NodesRepository: Repository<NodeEntity>,
  ) {}

  async findAll(): Promise<NodeEntity[]> {
    return this.NodesRepository.find();
  }

  async create(payload: CreateNodeDto): Promise<NodeEntity> {
    let allNodes = await this.NodesRepository.find();
    let nodelength = allNodes.length;
    
    if (nodelength < 1) {
      let rootPayload = {
        value: payload.value,
        hierarchy: 1,
        parentId: 0,
        ancestorIds: '0',
      };
      let savedNode = await this.NodesRepository.save(rootPayload);
      return savedNode;
    } else {
      //refactor the ancestorId and hierarchy
      let ancestorIds = `${payload.ancestorIds},${payload.parentId}`;
      let hierarchy = ancestorIds.split(',').length;
      let newPayload = { ...payload, ancestorIds, hierarchy };

      let savedNode = await this.NodesRepository.save(newPayload);
      return savedNode;
    }
  }

  async update(payload: UpdateNodeDto, id: number): Promise<NodeEntity> {
    await this.NodesRepository.update({ id }, payload);
    return this.NodesRepository.findOne({ id });
  }

  async delete(id: number): Promise<NodeEntity[]> {
    let allNode = await this.NodesRepository.find();
    let splitedNode = allNode.filter(
      (data) => data.ancestorIds.split(',').indexOf(`${id}`) !== -1,
    );

    let nodeChildren = splitedNode.map((data) => data.id);

    await this.NodesRepository.delete(id);
    if (nodeChildren.length > 0) {
      await this.NodesRepository.delete(nodeChildren);
    }

    return this.NodesRepository.find();
  }
}
