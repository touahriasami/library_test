import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import { Model, ObjectId } from 'mongoose';
import { Book } from '../books/schemas/book.schema';
import { Borrow } from '../borrows/schemas/borrow.schema';
import { CloudinaryService } from 'src/core/services/cloudinary/cloudinary.service';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @InjectModel(Borrow.name) private borrowModel: Model<Borrow>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createAuthorDto: CreateAuthorDto, photo: Express.Multer.File) {
    try {
      const data = await this.cloudinaryService.uploadPhoto(photo);

      const createdAuthor = new this.authorModel({ ...createAuthorDto });

      if (data) {
        createdAuthor.photo = data.secure_url;
      }

      return createdAuthor.save();
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return this.authorModel.find();
  }

  async findOne(id: ObjectId) {
    const author = await this.authorModel.findById(id);

    if (!author) {
      throw new NotFoundException('author doest not found');
    }

    return author;
  }

  update(id: ObjectId, updateAuthorDto: UpdateAuthorDto) {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, {
      new: true,
    });
  }

  async updatePhoto(id: ObjectId, photo: Express.Multer.File) {
    try {
      const data = await this.cloudinaryService.uploadPhoto(photo);

      const author = await this.findOne(id);

      author.photo = data.secure_url;

      return author.save();
    } catch (err) {
      throw err;
    }
  }

  remove(id: ObjectId) {
    return this.authorModel.deleteOne({
      _id: id,
    });
  }

  async topAuthors() {
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
        $lookup: {
          from: 'authors',
          localField: 'bookDetails.author',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $unwind: '$authorDetails',
      },
      {
        $group: {
          _id: '$authorDetails._id',
          author: { $first: '$authorDetails' },
          totalBorrows: { $sum: 1 },
        },
      },
      {
        $sort: { totalBorrows: -1 },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          authorId: '$_id',
          firstName: '$author.firstname',
          lastName: '$author.lastname',
          photo: '$author.photo',
          totalBorrows: 1,
        },
      },
    ]);
  }
}
