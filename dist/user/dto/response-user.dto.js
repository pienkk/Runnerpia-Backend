"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ResponseCreateUserDto {
    static fromEntity(entity) {
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
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '유저 이름',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '유저 닉네임',
        example: '홍길동',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '유저 아이디',
        example: 'hongildong',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '이용 횟수',
        example: '0',
    }),
    __metadata("design:type", Number)
], ResponseCreateUserDto.prototype, "numberOfUse", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: '생년월일',
        example: '1995',
    }),
    __metadata("design:type", Number)
], ResponseCreateUserDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({
        F: 'F',
        M: 'M',
    }),
    (0, swagger_1.ApiProperty)({
        description: '성별',
        example: 'M',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '도시',
        example: '서울',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '도',
        example: '서울',
    }),
    __metadata("design:type", String)
], ResponseCreateUserDto.prototype, "state", void 0);
exports.ResponseCreateUserDto = ResponseCreateUserDto;
//# sourceMappingURL=response-user.dto.js.map