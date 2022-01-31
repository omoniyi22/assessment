import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEntity } from './node.entity';
import { NodeService } from './node.service';


@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity])],
  controllers: [NodeController],
  providers:[NodeService]
})
export class NodeModule {}
