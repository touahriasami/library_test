import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ObjectId } from 'mongoose';
import { QueryBooksDto } from './dto/query-books.dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({
    summary: 'create book',
  })
  @Post('books')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({
    summary: 'get all books ',
  })
  @ApiQuery({
    name: 'genre',
    nullable: true,
    example: 'programming',
  })
  @ApiQuery({
    name: 'author',
    nullable: true,
    example: '687a7ced1a81a77e3673f93a',
  })
  @Get('books')
  findAll(@Query() query: QueryBooksDto) {
    return this.booksService.findAll(query);
  }

  @ApiOperation({
    summary: 'update book by providing _id',
  })
  @ApiParam({
    name: 'id',
  })
  @Put('books/:id')
  update(@Param('id') id: ObjectId, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiOperation({
    summary: 'delete book by providing _id',
  })
  @ApiParam({
    name: 'id',
  })
  @Delete('books/:id')
  remove(@Param('id') id: ObjectId) {
    return this.booksService.remove(id);
  }

  @ApiOperation({
    summary: 'get top genres',
  })
  @Get('top-genres')
  topGenres() {
    return this.booksService.topGenres();
  }
}
