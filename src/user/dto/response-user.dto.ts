import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class ResponseCreateUserDto {
  @IsString()
  @ApiProperty({
    description: '유저 이름',
    example: '홍길동',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: '유저 닉네임',
    example: '홍길동',
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    description: '유저 아이디',
    example: 'hongildong',
  })
  userId: string;

  @IsString()
  @ApiProperty({
    description: '이용 횟수',
    example: '0',
  })
  numberOfUse: number;

  @IsNumber()
  @ApiProperty({
    description: '생년월일',
    example: '1995',
  })
  birthDate: number;

  @IsEnum({
    F: 'F',
    M: 'M',
  })
  @ApiProperty({
    description: '성별',
    example: 'M',
  })
  gender: 'F' | 'M';

  @IsString()
  @ApiProperty({
    description: '도시',
    example: '서울',
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: '도',
    example: '서울',
  })
  state: string;

  static fromEntity(entity: User): ResponseCreateUserDto {
    const dto = new ResponseCreateUserDto();
    dto.name = entity.name;
    dto.nickname = entity.nickname;
    dto.userId = entity.userId;
    dto.numberOfUse = entity.numberOfUse;
    dto.birthDate = entity.birthDate;
    dto.gender = entity.gender;
    dto.city = entity.city;
    dto.state = entity.state;
    return dto;
  }
}
