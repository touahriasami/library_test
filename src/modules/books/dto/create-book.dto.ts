import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'author must be a valid MongoDB ObjectId' })
  author: string;

  @IsNotEmpty()
  availableCopies: number;
}
