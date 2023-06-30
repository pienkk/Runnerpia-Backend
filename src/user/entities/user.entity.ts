import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RunningRoute } from '../../running-route/entities/running-route.entity';
import { Bookmark } from './bookmark.entity';
import { Like } from './like.entity';
import { UserRecommendedTag } from './user-recommended-tag.entity';
import { UserSecureTag } from './user-secure-tag.entity';
import { TimeAbs } from 'src/common/entities/TimeAbs';

@Entity()
export class User extends TimeAbs {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '유저 아이디',
    name: 'user_idx',
  })
  userIdx: number;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '유저 이름' })
  name: string;

  @Column({ type: 'varchar', length: 20, comment: '유저 닉네임' })
  nickname: string;

  @Column({ type: 'varchar', length: 50, comment: '유저 아이디' })
  userId: string;

  @Column({ type: 'varchar', nullable: true, comment: '유저 비밀번호' })
  @Exclude()
  password: string;

  @Column({ type: 'int', default: 0 })
  numberOfUse: number;

  @Column({ type: 'int', nullable: true, comment: '유저 생년월일' })
  birthDate: number;

  @Column({
    type: 'enum',
    enum: ['F', 'M'],
    nullable: true,
    comment: '유저 성별',
  })
  gender: 'F' | 'M';

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '유저 도시' })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '유저 군' })
  state: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @OneToMany(() => RunningRoute, (runningRoute) => runningRoute.user)
  runningRoutes: RunningRoute[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(
    () => UserRecommendedTag,
    (userRecommendedTag) => userRecommendedTag.user,
  )
  userRecommendedTags: UserRecommendedTag[];

  @OneToMany(() => UserSecureTag, (userSecureTag) => userSecureTag.user)
  userSecureTags: UserSecureTag[];
}
