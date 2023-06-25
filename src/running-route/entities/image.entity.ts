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
export class Image extends TimeAbs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  routeImage: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'int', name: 'running_route_id' })
  runningRouteId: number;

  @ManyToOne(() => RunningRoute, (runningRoute) => runningRoute.images, {
    cascade: ['soft-remove'],
  })
  @JoinColumn({ name: 'running_route_id' })
  runningRoute: RunningRoute;
}
