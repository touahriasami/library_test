import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Injectable()
export class BorrowsService {
  create(createBorrowDto: CreateBorrowDto) {
    return 'This action adds a new borrow';
  }

  returnBook(id: string) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return `This action returns all borrows`;
  }
}
