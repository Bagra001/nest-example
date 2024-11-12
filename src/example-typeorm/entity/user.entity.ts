import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CAMPUS_USER' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  uuid: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Column()
  email: string;

  @Column()
  birthday: Date;
}
