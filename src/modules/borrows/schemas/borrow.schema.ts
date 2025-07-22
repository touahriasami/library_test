import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/modules/books/schemas/book.schema';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type BorrowDocument = HydratedDocument<Borrow>;

@Schema()
export class Borrow {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Book.name,
  })
  book: Book;

  @Prop({ required: true })
  person: string;

  @Prop({ required: true })
  borrowedAt: Date;

  @Prop()
  returnedAt: Date;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
