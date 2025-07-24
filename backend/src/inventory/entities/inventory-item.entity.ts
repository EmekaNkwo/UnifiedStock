import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @Column()
  tenantId: string;
}
