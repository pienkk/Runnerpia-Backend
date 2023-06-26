import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RunningRoute } from './running-route.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';

@Entity('images')
export class Image extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ type: 'varchar', name: 'route_image' })
  routeImage: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'int', name: 'running_route_id' })
  runningRouteId: number;

  @ManyToOne(() => RunningRoute, (runningRoute) => runningRoute.images, {
    cascade: ['soft-remove'],
  })
  @JoinColumn({ name: 'running_route_id', referencedColumnName: 'id' })
  runningRoute: RunningRoute;
}
