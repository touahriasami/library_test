import { IsOptional } from 'class-validator';

export class QueryBooksDto {
  @IsOptional()
  genre: string;

  @IsOptional()
  author: string;
}
