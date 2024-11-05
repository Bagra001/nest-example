import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column()
  email: string;

  @Column()
  birthday: Date;
}
