import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'string', unique: true })
  name!: string;

  @Column({ type: 'string' })
  email!: string;

  @Column({ type: 'number' })
  version!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
