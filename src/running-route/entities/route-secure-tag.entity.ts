import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RunningRoute } from './running-route.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';

@Entity()
export class RouteSecureTag extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ type: 'int' })
  index: number;

  @Column({
    type: 'int',
    name: 'running_route_id',
  })
  runningRouteId: number;

  @ManyToOne(
    () => RunningRoute,
    (runningRoute) => runningRoute.routeSecureTags,
    {
      cascade: ['soft-remove'],
    },
  )
  @JoinColumn({ name: 'running_route_id' })
  runningRoute: RunningRoute;
}
