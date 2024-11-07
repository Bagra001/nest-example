import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn({ type: 'uuid', length: 36 })
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
