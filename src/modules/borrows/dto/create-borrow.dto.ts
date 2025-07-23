import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'book must be a valid MongoDB ObjectId' })
  book: string;

  @IsNotEmpty()
  @IsString()
  person: string;
}
