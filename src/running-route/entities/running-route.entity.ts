import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Bookmark } from '../../user/entities/bookmark.entity';
import { Like } from '../../user/entities/like.entity';
import { RouteRecommendedTag } from './route-recommended-tag.entity';
import { RouteSecureTag } from './route-secure-tag.entity';
import { Image } from './image.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';
import { RunningRoutePath } from './running-route-path.entity';

@Entity('running_routes')
export class RunningRoute extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '경로 아이디',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    name: 'route_name',
    comment: '경로 이름',
  })
  routeName: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    name: 'start_latitude',
    comment: '경로 시작 위도',
  })
  startLatitude: string;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 8,
    name: 'start_logitude',
    comment: '경로 시작 경도',
  })
  startLongitude: string;

  // @Column({ type: 'point' })
  // startPoint: Geometry;

  // @Column({
  //   type: 'linestring',
  // })
  // arrayOfPos: Geometry;
  @Column({ type: 'time', name: 'running_time', comment: '러닝 시간' })
  runningTime: string;

  @Column({ type: 'varchar', length: 100, comment: '리뷰' })
  review: string;

  @Column({ type: 'float', comment: '거리' })
  distance: string;

  @Column({ type: 'date', name: 'running_date', comment: '러닝 날짜' })
  runningDate: Date;

  // @Column({ type: 'varchar' })
  // routeImage: string;

  @Column({ type: 'varchar', nullable: true })
  key: string;

  @Column({ type: 'varchar', length: 50, comment: '위치' })
  location: string;

  @Column({
    type: 'int',
    name: 'user_idx',
    comment: '유저 아이디',
  })
  userIdx: number;

  @Column({
    type: 'int',
    name: 'main_route_id',
    comment: '메인 경로 아이디',
    nullable: true,
  })
  mainRouteId: number;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.runningRoute)
  bookmarks: Bookmark[];

  @OneToMany(() => Like, (like) => like.runningRoute)
  likes: Like[];

  @OneToMany(() => RouteRecommendedTag, (tag) => tag.runningRoute)
  routeRecommendedTags: RouteRecommendedTag[];

  @OneToMany(() => RouteSecureTag, (tag) => tag.runningRoute)
  routeSecureTags: RouteSecureTag[];

  @OneToMany(() => Image, (image) => image.runningRoute)
  images: Image[];

  @OneToMany(() => RunningRoute, (runningRoute) => runningRoute.mainRoute)
  subRoute: RunningRoute[];

  @OneToMany(
    () => RunningRoutePath,
    (runningRoutePath) => runningRoutePath.runningRoute,
  )
  runningRoutePaths: RunningRoutePath[];

  @ManyToOne(() => User, (user) => user.runningRoutes)
  @JoinColumn({ name: 'user_idx' })
  user: User;

  @ManyToOne(() => RunningRoute, (runningRoute) => runningRoute.subRoute)
  @JoinColumn({ name: 'main_route_id', referencedColumnName: 'id' })
  mainRoute?: RunningRoute;
}
