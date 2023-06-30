import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { User } from './user.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';

@Entity('likes')
export class Like extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'int',
    name: 'user_idx',
    comment: '유저 아이디',
  })
  userIdx: number;

  @Column({
    type: 'int',
    name: 'running_route_id',
    comment: '러닝 경로 아이디',
  })
  runningRouteId: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @ManyToOne(() => RunningRoute, (runningRoute) => runningRoute.likes)
  @JoinColumn({ name: 'running_route_id', referencedColumnName: 'id' })
  runningRoute: RunningRoute;
}
