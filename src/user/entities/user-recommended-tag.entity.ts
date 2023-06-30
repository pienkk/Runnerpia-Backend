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

@Entity('user_recommended_tags')
export class UserRecommendedTag extends TimeAbs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  index: number;

  @Column({ type: 'int', name: 'user_idx', comment: '유저 아이디' })
  userIdx: number;

  @ManyToOne(() => User, (user) => user.userRecommendedTags, {
    cascade: ['soft-remove'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
