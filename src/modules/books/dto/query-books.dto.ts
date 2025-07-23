import { IsObjectIdPipe } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class QueryBooksDto {
  @IsOptional()
  genre?: string;

  @IsOptional()
  @IsMongoId({ message: 'author must be a valid MongoDB ObjectId' })
  author?: string;
}
