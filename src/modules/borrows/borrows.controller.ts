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

@Controller()
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post('borrow')
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.create(createBorrowDto);
  }

  @Post('return/:id')
  returnBook(@Param('id') id: string) {
    return this.borrowsService.returnBook(id);
  }

  @Get('borrow')
  findAll() {
    return this.borrowsService.findAll();
  }
}
