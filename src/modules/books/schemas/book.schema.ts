import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Author } from 'src/modules/authors/schemas/author.schema';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop({ required: true })
  availableCopies: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
