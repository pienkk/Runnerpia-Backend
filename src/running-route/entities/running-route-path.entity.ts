import { TimeAbs } from 'src/common/entities/TimeAbs';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RunningRoute } from './running-route.entity';

@Entity('running_route_paths')
export class RunningRoutePath extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '러닝 경로 아이디',
  })
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    comment: '경로 위도',
  })
  latitude: string;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 8,
    comment: '경로 경도',
  })
  longitude: string;

  @Column({
    type: 'int',
    comment: '경로 순서',
  })
  order: number;

  @Column({
    type: 'int',
    comment: '경로 아이디',
    name: 'running_route_id',
  })
  runningRouteId: number;

  @ManyToOne(
    () => RunningRoute,
    (runningRoute) => runningRoute.runningRoutePaths,
  )
  @JoinColumn({ name: 'running_route_id' })
  runningRoute: RunningRoute;
}
