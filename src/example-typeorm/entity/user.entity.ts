import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'alphanum' })
  password: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'date' })
  birthday: string;
}
