import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ObjectId } from 'mongoose';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller()
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @ApiOperation({
    summary: 'create borrow book',
  })
  @Post('borrow')
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.create(createBorrowDto);
  }

  @ApiOperation({
    summary: 'mark book as returned',
  })
  @ApiParam({
    name: 'id',
  })
  @Post('return/:id')
  returnBook(@Param('id') id: ObjectId) {
    return this.borrowsService.returnBook(id);
  }

  @ApiOperation({
    summary: 'get all borrowed books',
  })
  @Get('borrow')
  findAll() {
    return this.borrowsService.findAll();
  }
}
