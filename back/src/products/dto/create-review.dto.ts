import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
