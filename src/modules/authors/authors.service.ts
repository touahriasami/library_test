import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  create(createAuthorDto: CreateAuthorDto) {
    const createdAuthor = new this.authorModel(createAuthorDto);

    return createdAuthor.save();
  }

  findAll() {
    return this.authorModel.find().exec();
  }

  findOne(id: number) {
    return this.authorModel.findById(id).exec();
  }

  update(id: ObjectId, updateAuthorDto: UpdateAuthorDto) {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, {
      new: true,
    });
  }
  updatePhoto(id: ObjectId, photo: string) {
    throw new Error('Method not implemented.');
  }

  remove(id: ObjectId) {
    return this.authorModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
