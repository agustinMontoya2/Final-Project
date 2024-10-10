import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'credentials' })
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  credentials_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  //@ApiHideProperty() -- falta instalar swagger
  //   @isEmpty()
  isAdmin: boolean;

  @OneToOne(() => User, (user) => user.credential)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
