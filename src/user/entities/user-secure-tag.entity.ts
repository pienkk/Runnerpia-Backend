import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';

@Entity('user_secure_tags')
export class UserSecureTag extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ type: 'int' })
  index: number;

  @Column({ type: 'int', name: 'user_idx', comment: '유저 아이디' })
  userIdx: number;

  @ManyToOne(() => User, (user) => user.userSecureTags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
