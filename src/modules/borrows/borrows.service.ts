import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Borrow } from './schemas/borrow.schema';
import { Connection, Model, ObjectId } from 'mongoose';
import { Book } from '../books/schemas/book.schema';
import { response } from 'express';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Borrow.name) private readonly borrowModel: Model<Borrow>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBorrowDto: CreateBorrowDto) {
    const session = await this.connection.startSession();
    try {
      await session.withTransaction(async () => {
        const book = await this.bookModel
          .findById(createBorrowDto.book)
          .session(session);

        if (!book) {
          throw new NotFoundException('Book not found');
        }

        if (book.availableCopies <= 0) {
          throw new UnauthorizedException('No available copies');
        }

        book.availableCopies -= 1;
        await book.save({ session });

        const newBorrow = new this.borrowModel({
          ...createBorrowDto,
          borrowedAt: new Date(),
        });
        await newBorrow.save({ session });
      });

      return {
        message: 'Book borrowed successfully',
      };
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      await session.endSession();
    }
  }

  async returnBook(id: ObjectId) {
    const session = await this.connection.startSession();
    try {
      await session.withTransaction(async () => {
        const borrowed = await this.borrowModel.findById(id).session(session);

        if (!borrowed) {
          throw new NotFoundException('no borrowed book found');
        }

        borrowed.returnedAt = new Date();
        await borrowed.save({ session });

        await this.bookModel
          .findByIdAndUpdate(borrowed.book, { $inc: { availableCopies: +1 } })
          .session(session);
      });

      return {
        message: 'Book borrowed successfully',
      };
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      await session.endSession();
    }
  }

  findAll() {
    return this.borrowModel.find().populate({
      path: 'book',
      populate: {
        path: 'author',
      },
    });
  }
}
