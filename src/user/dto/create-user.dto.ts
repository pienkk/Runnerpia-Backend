import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * 유저 생성 요청 DTO
 */
export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '유저 이름',
    example: '홍길동',
    required: false,
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '유저 닉네임',
    example: '홍길동',
    required: false,
  })
  readonly nickname: string;

  @IsString()
  @ApiProperty({
    description: '유저 아이디',
    example: 'hongildong',
    required: true,
  })
  readonly userId: string;

  @IsString()
  @ApiProperty({
    description: '유저 비밀번호',
    example: 'Qwer1234!',
    required: true,
  })
  password: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    description: '생년월일',
    example: '1995',
    required: false,
  })
  readonly birthDate: number;

  @IsEnum({
    F: 'F',
    M: 'M',
  })
  @IsOptional()
  @ApiProperty({
    description: '성별',
    example: 'M',
    required: false,
  })
  readonly gender: 'F' | 'M';

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '도시',
    example: '서울',
    required: false,
  })
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '지역',
    example: '봉천동',
    required: false,
  })
  readonly state: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: '관심 태그',
    example: [1, 2, 3],
    required: false,
  })
  readonly recommendedTags: number[];

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: '보안 태그',
    example: [1, 2, 3],
    required: false,
  })
  readonly secureTags: number[];
}
