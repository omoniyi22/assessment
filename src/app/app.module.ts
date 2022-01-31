import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from 'src/node/node.module';
import { NodeEntity } from 'src/node/node.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'NodeDB',
      autoLoadEntities: true,
      synchronize: true,
      entities: [NodeEntity]
    }),
    NodeModule
  ],
})
export class AppModule {
  
}
