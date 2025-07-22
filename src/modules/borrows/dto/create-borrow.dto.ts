import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsString()
  book: ObjectId;

  @IsNotEmpty()
  @IsString()
  person: string;
}
