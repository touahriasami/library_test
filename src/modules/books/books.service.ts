import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, ObjectId } from 'mongoose';
import { Borrow } from '../borrows/schemas/borrow.schema';
import { QueryBooksDto } from './dto/query-books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Borrow.name) private readonly borrowModel: Model<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const createBook = new this.bookModel(createBookDto);
    return createBook.save();
  }

  findAll({ author, genre }: QueryBooksDto) {
    let match = {};

    if (genre) {
      match['genre'] = genre;
    }

    if (author) {
      match['author'] = author;
    }
    console.log(match);
    return this.bookModel.find(match).populate('author');
  }

  update(id: ObjectId, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  remove(id: ObjectId) {
    return this.bookModel.deleteOne({
      _id: id,
    });
  }

  topGenres() {
    return this.borrowModel.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $group: {
          _id: '$bookDetails.genre',
          totalBorrows: { $sum: 1 },
        },
      },
      {
        $sort: { totalBorrows: -1 },
      },
      {
        $project: {
          _id: 0,
          genre: '$_id',
          totalBorrows: 1,
        },
      },
    ]);
  }
}
