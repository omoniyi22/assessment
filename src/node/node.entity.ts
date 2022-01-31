import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  hierarchy: number;

  @Column()
  parentId: number;

  @Column()
  ancestorIds: string;
}
